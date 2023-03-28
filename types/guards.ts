import { Bundles, Otp } from "./common";

export function isOtp(otp:any):otp is Otp{
    return(
        otp &&
        typeof otp === "object" &&
        "pin" in otp &&
        typeof otp["pin"] === "string" &&
        "otpSid" in otp &&
        typeof otp["otpSid"] === "string"
    )
}

export function isBundle(bundle:any): bundle is Bundles{{
        return (
            bundle &&
            typeof bundle === "object" &&
            "size" in bundle &&
            typeof bundle["size"] === "string" &&
            "unit" in bundle &&
            typeof bundle['unit'] === "string" &&
            "unit" in bundle &&
            typeof bundle['amount'] === "number" &&
            "amount" in bundle &&
            typeof bundle['bundlePackageId'] === "number" 
        )
    }
}

export function isBundlesArray(bundles:any[]): bundles is Array<Bundles>{
    return bundles.every(isBundle)
}