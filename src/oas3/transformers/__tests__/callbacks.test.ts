import { DeepPartial } from '@stoplight/types';

import { createContext } from '../../../oas/context';
import { OpenAPIObject } from '../../types';
import { translateToCallbacks as _translateToCallbacks } from '../callbacks';

const translateToCallbacks = (document: DeepPartial<OpenAPIObject>, callbacks: unknown) =>
  _translateToCallbacks.call(createContext(document), callbacks);

describe('translateToCallbacks', () => {
  it('given multiple callback entries, it should translate', () => {
    const callbackEntries = {
      newPetWebhook: {
        '{$request.body#/newPetAvailableUrl}': {
          post: {
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'A new pet has arrived',
                      },
                    },
                    required: ['message'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Your server returns this code if it accepts the callback',
              },
            },
          },
        },
        '{$request.body#/returnedPetAvailableUrl}': {
          post: {
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'A pet has been returned',
                      },
                    },
                    required: ['message'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Your server returns this code if it accepts the callback',
              },
            },
          },
        },
      },
      petAdopted: {
        '{$request.body#/adoptedUrl}': {
          post: {
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'A pet has been adopted',
                      },
                    },
                    required: ['message'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Your server returns this code if it accepts the callback',
              },
            },
          },
        },
      },
      petReturned: {
        $ref: 'target.yaml#/components/callbacks/SharedCallback1',
      },
    };
    expect(translateToCallbacks({}, callbackEntries)).toStrictEqual([
      {
        key: 'newPetWebhook',
        extensions: {},
        id: '3245690b6a7fc',
        method: 'post',
        path: '{$request.body#/newPetAvailableUrl}',
        request: {
          body: {
            contents: [
              {
                encodings: [],
                examples: [],
                id: expect.any(String),
                mediaType: 'application/json',
                schema: {
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  properties: {
                    message: {
                      examples: ['A new pet has arrived'],
                      type: 'string',
                    },
                  },
                  required: ['message'],
                  type: 'object',
                  'x-stoplight': {
                    id: expect.any(String),
                  },
                },
              },
            ],
            id: expect.any(String),
            required: true,
          },
          cookie: [],
          headers: [],
          path: [],
          query: [],
        },
        responses: [
          {
            code: '200',
            contents: [],
            description: 'Your server returns this code if it accepts the callback',
            headers: [],
            id: expect.any(String),
          },
        ],
        security: [],
        securityDeclarationType: 'inheritedFromService',
        servers: [],
        tags: [],
      },
      {
        key: 'newPetWebhook',
        extensions: {},
        id: '07041d5723f4a',
        method: 'post',
        path: '{$request.body#/returnedPetAvailableUrl}',
        request: {
          body: {
            contents: [
              {
                encodings: [],
                examples: [],
                id: expect.any(String),
                mediaType: 'application/json',
                schema: {
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  properties: {
                    message: {
                      examples: ['A pet has been returned'],
                      type: 'string',
                    },
                  },
                  required: ['message'],
                  type: 'object',
                  'x-stoplight': {
                    id: expect.any(String),
                  },
                },
              },
            ],
            id: expect.any(String),
            required: true,
          },
          cookie: [],
          headers: [],
          path: [],
          query: [],
        },
        responses: [
          {
            code: '200',
            contents: [],
            description: 'Your server returns this code if it accepts the callback',
            headers: [],
            id: expect.any(String),
          },
        ],
        security: [],
        securityDeclarationType: 'inheritedFromService',
        servers: [],
        tags: [],
      },
      {
        key: 'petAdopted',
        extensions: {},
        id: '2333951a518f9',
        method: 'post',
        path: '{$request.body#/adoptedUrl}',
        request: {
          body: {
            contents: [
              {
                encodings: [],
                examples: [],
                id: expect.any(String),
                mediaType: 'application/json',
                schema: {
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  properties: {
                    message: {
                      examples: ['A pet has been adopted'],
                      type: 'string',
                    },
                  },
                  required: ['message'],
                  type: 'object',
                  'x-stoplight': {
                    id: expect.any(String),
                  },
                },
              },
            ],
            id: expect.any(String),
            required: true,
          },
          cookie: [],
          headers: [],
          path: [],
          query: [],
        },
        responses: [
          {
            code: '200',
            contents: [],
            description: 'Your server returns this code if it accepts the callback',
            headers: [],
            id: expect.any(String),
          },
        ],
        security: [],
        securityDeclarationType: 'inheritedFromService',
        servers: [],
        tags: [],
      },
      {
        key: 'petReturned',
        $ref: 'target.yaml#/components/callbacks/SharedCallback1',
      },
    ]);
  });
});
