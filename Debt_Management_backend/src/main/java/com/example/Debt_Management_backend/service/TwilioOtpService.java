package com.example.Debt_Management_backend.service;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.stereotype.Service;

@Service
public class TwilioOtpService {

    public static final String ACCOUNT_SID = "AC85a61e83cbf5c05edd4df5f4165919c0";
    public static final String AUTH_TOKEN = "22ca5e4a026ef3a5d37884aca9b71b57";
    public static final String SERVICE_SID = "VA1fe32f116e0edea0fae37a8212d78226";

    public TwilioOtpService() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendOtp(String phoneNumber) {
        Verification.creator(SERVICE_SID, phoneNumber, "sms").create();
    }

    public boolean verifyOtp(String phoneNumber, String otp) {
        VerificationCheck verificationCheck = VerificationCheck.creator(SERVICE_SID)
                .setTo(phoneNumber)
                .setCode(otp)
                .create();
        return "approved".equals(verificationCheck.getStatus());
    }
}

