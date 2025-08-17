import {
  SelfBackendVerifier,
  AllIds,
  DefaultConfigStore,
  VerificationConfig
} from '@selfxyz/core';

const verification_config: VerificationConfig = {
  excludedCountries: [],
  ofac: false,
  minimumAge: 18,
};

const configStore = new DefaultConfigStore(verification_config);

const selfBackendVerifier = new SelfBackendVerifier(
  "your-app-scope",
  "https://your-api-endpoint.com/api/verify",
  true, // Set to false in production
  AllIds,
  configStore,
  "hex"
);

export async function verifyKYC({ attestationId, proof, publicSignals, userContextData }: any) {
  if (!proof || !publicSignals || !attestationId || !userContextData) {
    throw new Error("Proof, publicSignals, attestationId and userContextData are required");
  }

  const result = await selfBackendVerifier.verify(
    attestationId,
    proof,
    publicSignals,
    userContextData
  );

  if (result.isValidDetails.isValid) {
    return { verified: true, details: result.discloseOutput };
  } else {
    throw new Error("Verification failed");
  }
}
