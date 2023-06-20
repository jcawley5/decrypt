"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { JWK, JWE } = require("node-jose");
const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;

const services = xsenv.getServices({ uaa: "decrypt-uaa" });

passport.use(new JWTStrategy(services.uaa));

var contentAlg = "A256CBC-HS512";

var pubKeyJwks = {
  kty: "RSA",
  e: "AQAB",
  kid: "e5562da4-2fe2-4603-ad21-a28c34ad8131",
  n: "sy3sx9fwcxE1wmAQ5LpKUOUr-9wn_fTT3cw6IpOkb89aqaYAthBlU2ufEJSzRbxtrONuIDCHdHMstHO2SQa5vczLThZeoEkkW8Nk0KUplUzoss4R7QSJQq7t_UBiIwYJxEzqMyCTK5ml3vY4UYzLMVqdvwF5xKwirDdiede_DZcRH0i-yTL82vQCIyZJJ6Q3Qxks0SyQ6sXNeoqAF_aQNaG3D3a91HFaMHKz1n9ZyMnF62nPsdBFjTlIM9pwnNsEYOBczmWagy2bLuhH_GACreu8xatuJyiV-X7pt8U8Lmsj7As__R7nIJthuS6chdWTjChhMeZUV_nRfWcfLcX6Gw",
};

const privKeyJwks = {
  p: "3xlAmJRyIzhvPcuahFD9pnFX4z4_EWs-r4pS-t6yfzgMY6gDROtfbnuXBpq37jojGIOEH41G7KIKxnWwNL6k2cI5kQcIBUTI0fzaqo6q8A19a2Y0GKWrK0inpBJKP-W4JVLlCuJMiwDo-Z-acmKFbME6P0bgNKpVGaXRgipqrq8",
  kty: "RSA",
  q: "zZqRkk029M-eMoagp4zUxvy7IR5HHdk-FLQmc3ansVIbMkF9aJhBQZ70MKYCkfwTfxSIl1SFZq0RSssmjSEXNK693nkTyUlWux2RM3nalT6RGtn8UQNlzRPGQ_vmCQP8samn0qK560hUETBDxjwcgl6k-qNO5newmMSzaV9UJlU",
  d: "GazYBB72TpbFvE-lvBDRu1vLfLCkbmiZv2uXXQMJChiNZkfqTCx3SIfgaDDWq4R_tsl0K1qo3k_utQDruvUiwobJDyx3bMJuWlPaa2dvWPyHT6_ls6_1tz93zNVf-qLP3XgkCyV80T-YHCXuFgl1yGGyvv8IIt2DrmfVTZ5Tuy-QDzITqZcB2hK-DFDUhpJwOH1EaMq6rWhD0X6kq91afCjo_RaQafQsmyzrlk552t4KQlnRx2T5XlszV4lMjb8VAMbA0noSps_Xxqm5SP8i_lYDjQb-ss7RgANC2LkGTu9MgPj8RTdDXCkhjRc-6Y9l3TpyTX18zjVoCn2tZrC7aQ",
  e: "AQAB",
  kid: "1d08f46b-ffe6-4657-a2c4-4590934c76bc",
  qi: "HyCAhOxxc8LPQIwik_kO0iPcubmscjQstTQ5_dgHTJCT5VvhhrkwREA0cQcaYuSgqAB4gGWHPL_IglmSOJmNqnGnran647x5L0ZqkblHreNPU7JUCY3e7lMczq4m_sMCBQhavL9ctYDEGJ2baDvoWm43c_y2yYjtw3dNY2EroWE",
  dp: "CryaYT1zqMJEiELOMuP68RGvWx5ZxqrUn3oWuEATcw_teLZTQfPZ6eVExWqYw3xEyB88MpCIA0dhIV_0lPU_1cMFJjeiaS6AQ6rZky--hkL_8DVA-JawgCrE9p5yuFSD4jf1EesGKAJpM-o8cpjPNwatmPH-REqWQd-7D3qfG70",
  dq: "P2s5Ec6dcAAGhQE_1s665zIXqoyDVTKoUoyK-7yS10BDQUowG64zGsGkAsmCK3N8tAsqYrtgdp5VoiNtncSiOs7XpCLmtoTXqtng6ubgRH7LFWQ9zuNkaFB8LIYrm4ZOUKLLME6fWHKz86VWknQCOzhkXSc4dCBhKY4q5QrRkw0",
  n: "sy3sx9fwcxE1wmAQ5LpKUOUr-9wn_fTT3cw6IpOkb89aqaYAthBlU2ufEJSzRbxtrONuIDCHdHMstHO2SQa5vczLThZeoEkkW8Nk0KUplUzoss4R7QSJQq7t_UBiIwYJxEzqMyCTK5ml3vY4UYzLMVqdvwF5xKwirDdiede_DZcRH0i-yTL82vQCIyZJJ6Q3Qxks0SyQ6sXNeoqAF_aQNaG3D3a91HFaMHKz1n9ZyMnF62nPsdBFjTlIM9pwnNsEYOBczmWagy2bLuhH_GACreu8xatuJyiV-X7pt8U8Lmsj7As__R7nIJthuS6chdWTjChhMeZUV_nRfWcfLcX6Gw",
};

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

app.get("/", async (req, res) => {
  res.send("not implemented");
});

app.post("/", async (req, res) => {
  var result = "";
  try {
    const jweToken = req.body.jweToken;
    if (jweToken) {
      result = await decryptJWE(jweToken);
    } else {
      result = "no jweToken found";
    }
  } catch (error) {
    console.log("error: ", error);
    result = { error: error.message };
  }
  res.send(result);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});

async function createJWE() {
  try {
    // Prep payload to encrypt
    const payload = JSON.stringify({
      jws: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJhcGk6Ly9vbGYtc2VydmljZXMtZGV2Lm1pc25wLmFtZG9jcy5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jOGVjYTNjYS0xMjc2LTQ2ZDUtOWQ5ZC1hMGYyYTAyODkyMGYvIiwiaWF0IjoxNjU1OTkyOTM1LCJuYmYiOjE2NTU5OTI5MzUsImV4cCI6MTY1NTk5ODA5MywiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQU1jYnZRRXhHTW1UaUV4bDR5WXdLdzR1SFJzb0Q5bFlETlJ5Ymx0N2pyeW0vVFB0L0N2aTFNdXRJWFc5WnBnSzE1WDBTcDlIbkRwcWl2R2Z4cVR6cGhOSnRNUTN2QU5TNjBzRjhQK2I5QTA0PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiJjYTIzODg1OC1lZTY1LTQxNmYtOWQ0My1mNzdiMGE0NTBkZDYiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6Ik1lbmFzaGUiLCJnaXZlbl9uYW1lIjoiQmVuIiwiaXBhZGRyIjoiNjkuMTUwLjI3LjMyIiwibmFtZSI6IkJlbiBNZW5hc2hlIiwib2lkIjoiM2JkYzVkMzktMzE2Yy00MWI2LTg1OTgtMmY0NDVhN2YxOTZmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE0Mzc0NDIyNy0xNzQ5OTk2MDAtNjQyMTg5OTQ1LTc1NzYwIiwicmgiOiIwLkFRa0F5cVBzeUhZUzFVYWRuYUR5b0NpU0Q2YzJUV25NSFhST2dKdGNLT2tkRnpFSkFOWS4iLCJzY3AiOiJhcHByb3ZhbC5yZWFkIiwic3ViIjoiWlI3MHQ5MldxOXoxZlNTWjUyX0pfWmtFLTIyMVF0Ymt6SlI2TW9nNEpXOCIsInRpZCI6ImM4ZWNhM2NhLTEyNzYtNDZkNS05ZDlkLWEwZjJhMDI4OTIwZiIsInVuaXF1ZV9uYW1lIjoiQmVuTUBhbWRvY3MuY29tIiwidXBuIjoiQmVuTUBhbWRvY3MuY29tIiwidXRpIjoiWTRpeElDNW1xRWEzMk1lenRJa09BQSIsInZlciI6IjEuMCIsIm1hbmFnZXJfdHlwZSI6Ik1BTiIsIkVtcGxveWVlLUlEIjoiNTEyOSJ9.oI325coIt0tvMtR-ChcQETsNjG4DCyZt0agNrmgMTMDovWqAnybJ1qUC8tfK9wWa3cxD7zpxnySlXyL5YA_-Llr8mmusOk3MSjYTRg-Nsb52XXrQoN7s7Cs501Ac_Y05SQU0H1j3qWqloIDoK2Hd8uh-gWB3_SAvcBV1FAlSrqaX5BWGI79HFTe0mJgAgnL0YaAtUGBxvMKNUmbZdVHxtlAE5jXsbrWUQrmS_FVIa87I5PG06mASFqrP2nVMSFEUrf05jVlGkF8bJqNcW7M9zTg99FRFJCmw6XV1CTFl3qUnlFcR612cl9zjUGuhp4AXUaUk5IsS6FSR-N1yAEkXBw", // User's access token
      payloadSHA256: getPayloadHash(), // Request payload hash
    });
    console.log("payload", payload);

    // Prep encrypt options
    const pubKey = await JWK.asKey(pubKeyJwks);
    const options = {
      compact: true,
      contentAlg: contentAlg,
      protect: Object.keys({
        alg: pubKey.alg,
        kid: pubKey.kid,
        enc: contentAlg,
      }),
      fields: {
        alg: pubKey.alg,
        kid: pubKey.kid,
        enc: contentAlg,
        test: "boo", // We can add here additional fields that will be visible in JWE header
      },
    };

    // Encrypt w/ public key to JWE format
    const jweToken = await JWE.createEncrypt(options, pubKey)
      .update(payload, "utf8")
      .final();
    return jweToken;
  } catch (e) {
    console.error(e);
    return "an error occurred...";
  }
}

async function decryptJWE(jweToken) {
  try {
    // Decrypt JWE w/ private key
    const privKey = await JWK.asKey(privKeyJwks);
    return (
      await JWE.createDecrypt(privKey).decrypt(jweToken)
    ).plaintext.toString();
  } catch (e) {
    console.error(e);
    return "an error occurred...";
  }
}

function getPayloadHash() {
  const samplePayload = JSON.stringify({
    body: `<root type="object">
  <request type="object">
    <TaskId type="string">208901</TaskId>
  </request>
</root>`,
  });

  return crypto.createHash("sha256").update(samplePayload).digest("base64");
}
