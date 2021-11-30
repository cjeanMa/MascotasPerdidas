const { SNSClient } = require("@aws-sdk/client-sns");
const { PublishCommand } = require("@aws-sdk/client-sns");
// Set the AWS Region.
const REGION = process.env.REGION; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });

const sendSMS = async (code, phone) =>{
    const params = {
        Message: `Ingrese este codigo para modificar su password ${code}` /* required */,
        PhoneNumber: `${process.env.POSTAL_CODE}${phone}`, //PHONE_NUMBER, in the E.164 phone number structure
    };
    const data = await snsClient.send(new PublishCommand(params));
    console.log(params)
    return data;
}


module.exports = { sendSMS };