import "@typespec/http";
import "@typespec/spector";
import "@azure-tools/typespec-client-generator-core";
import "./main.tsp";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;
using Client.AlternateApiVersion.Service.Header;
using Spector;

namespace Customizations;

@@apiVersion(HeaderApiVersionParam.version);
