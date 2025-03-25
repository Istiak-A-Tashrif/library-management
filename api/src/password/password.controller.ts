import {Body, Controller, Post} from "@nestjs/common";
import {res} from "src/common/response.helper";
import {RequestOtpDto, ResetPasswordDto, ResetPasswordVerifyOtpDto} from "./reset.password.dto";
import {PasswordService} from "./password.service";

@Controller('reset-password')
export class PasswordController {
    constructor(private passwordService: PasswordService) { }

    @Post('request-otp')
    async requestOtp(@Body() data : RequestOtpDto){
        const verify = await this.passwordService.requestOtp(data)
        return res.success({}, "We sent an OTP code to your email")
    }

    @Post('verify-otp')
    async verifyOtp(@Body() data : ResetPasswordVerifyOtpDto){
        const verify = await this.passwordService.verifyOtp(data)
        return res.success(verify, "OTP Verified")
    }

    @Post()
    async resetPassword(@Body() data : ResetPasswordDto){
        const verify = await this.passwordService.resetPassword(data)
        return res.success(verify, "Password reset successful")
    }
}
