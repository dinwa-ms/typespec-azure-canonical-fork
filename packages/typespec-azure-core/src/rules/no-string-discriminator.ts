import { Model, createRule, getDiscriminator, paramMessage } from "@typespec/compiler";

export const noStringDiscriminatorRule = createRule({
  name: "no-string-discriminator",
  description:
    "Azure services discriminated models should define the discriminated property as an extensible union.",
  severity: "warning",
  url: "https://azure.github.io/typespec-azure/docs/libraries/azure-core/rules/no-string-discriminator",
  messages: {
    default: `Use an extensible union instead of a plain string (ex: \`union PetKind { cat: "cat", dog: "dog", string };\`)`,
    noProp: paramMessage`Discriminated model should define an the discriminator property ${"propName"} with an extensible union as type.`,
  },
  create(context) {
    return {
      model: (model: Model) => {
        const discriminator = getDiscriminator(context.program, model);
        if (discriminator === undefined) {
          return;
        }

        const prop = model.properties.get(discriminator.propertyName);
        if (prop === undefined) {
          context.reportDiagnostic({
            format: { propName: discriminator.propertyName },
            target: model,
          });
        } else {
          if (prop.type.kind !== "Union") {
            context.reportDiagnostic({
              format: { propName: discriminator.propertyName },
              target: prop,
            });
          }
        }
      },
    };
  },
});
