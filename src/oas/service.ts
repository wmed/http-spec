import { isPlainObject } from '@stoplight/json';
import { DeepPartial, IHttpService } from '@stoplight/types';
import { Spec } from 'swagger-schema-official';

import { OpenAPIObject } from '../oas3/types';
import pickBy = require('lodash.pickby');

import { isBoolean, isNonNullable, isString } from '../guards';
import { TranslateFunction } from '../types';
import { getExtensions } from './accessors';
import { toExternalDocs } from './externalDocs';
import { hasXLogo } from './guards';
import { translateTagDefinition } from './tags';
import { translateLogo } from './transformers/translateLogo';

export const transformOasService: TranslateFunction<DeepPartial<OpenAPIObject> | DeepPartial<Spec>, [], IHttpService> =
  function () {
    const document = this.document;
    const id = String(document['x-stoplight']?.id);
    this.ids.service = id;
    this.parentId = id;

    const httpService: IHttpService = {
      id,

      version: document.info?.version ?? '',
      name: document.info?.title ?? 'no-title',

      ...pickBy(
        {
          description: document.info?.description,
          termsOfService: document.info?.termsOfService,
        },
        isString,
      ),

      ...pickBy(
        {
          contact: document.info?.contact,
        },
        isPlainObject,
      ),

      ...pickBy(
        {
          internal: document['x-internal'],
        },
        isBoolean,
      ),

      ...toExternalDocs(document.externalDocs),
      extensions: getExtensions(document),
      infoExtensions: getExtensions(document.info),
    };

    if (isPlainObject(document.info) && hasXLogo(document.info)) {
      httpService.logo = translateLogo(document.info);
    }

    const tags = Array.isArray(document.tags)
      ? document.tags.map(translateTagDefinition, this).filter(isNonNullable)
      : [];

    if (tags.length > 0) {
      httpService.tags = tags;
    }

    return httpService;
  };
