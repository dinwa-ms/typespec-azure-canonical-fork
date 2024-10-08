import type { DecoratorContext, Model } from "@typespec/compiler";

/**
 * Deletes any key properties from the model.
 */
export type OmitKeyPropertiesDecorator = (context: DecoratorContext, entity: Model) => void;

/**
 * Identifies a property on a request model that serves as a linked operation parameter.
 *
 * @param name Property name on the target
 */
export type RequestParameterDecorator = (
  context: DecoratorContext,
  entity: Model,
  name: string
) => void;

/**
 * Identifies a property on *all* non-error response models that serve as a linked operation parameter.
 *
 * @param name Property name on the target
 */
export type ResponsePropertyDecorator = (
  context: DecoratorContext,
  entity: Model,
  name: string
) => void;

export type AzureCoreFoundationsDecorators = {
  omitKeyProperties: OmitKeyPropertiesDecorator;
  requestParameter: RequestParameterDecorator;
  responseProperty: ResponsePropertyDecorator;
};
