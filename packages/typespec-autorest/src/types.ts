import type { Service, SourceFile } from "@typespec/compiler";
import type { OpenAPI2Document } from "./openapi2-document.js";

/**
 * A record containing the the OpenAPI 3 documents corresponding to
 * a particular service definition.
 */
export type AutorestServiceRecord =
  | AutorestUnversionedServiceRecord
  | AutorestVersionedServiceRecord;

export interface AutorestUnversionedServiceRecord extends AutorestEmitterResult {
  /** The service that generated this OpenAPI document */
  readonly service: Service;

  /** Whether the service is versioned */
  readonly versioned: false;
}

export interface AutorestVersionedServiceRecord {
  /** The service that generated this OpenAPI document */
  readonly service: Service;

  /** Whether the service is versioned */
  readonly versioned: true;

  /** The OpenAPI 3 document records for each version of this service */
  readonly versions: AutorestVersionedDocumentRecord[];
}

/**
 * A record containing an unversioned OpenAPI document and associated metadata.
 */
export interface AutorestVersionedDocumentRecord extends AutorestEmitterResult {
  /** The service that generated this OpenAPI document. */
  readonly service: Service;

  /** The version of the service. Absent if the service is unversioned. */
  readonly version: string;
}

export interface OperationExamples {
  readonly operationId: string;
  readonly examples: LoadedExample[];
}

export interface AutorestEmitterResult {
  /** The OpenAPI document*/
  readonly document: OpenAPI2Document;

  /** The examples */
  readonly operationExamples: OperationExamples[];

  /** Output file used */
  readonly outputFile: string;
}

export interface LoadedExample {
  readonly relativePath: string;
  readonly file: SourceFile;
  readonly data: any;
}
