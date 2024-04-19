import apimiddleware from './apimiddleware';
import createBotInstance from '@/src/util/telegrambot';

async function handler(req, res){
    if(req.method === "POST"){
        const bot = createBotInstance(process.env.NEXT_PUBLIC_TELE_BOT_KEY);
        const { decodedToken, orderID, paymentID, paymentMode, address, time, items, totalAmount, delivered } = req.body;
        const { uid, phone_number } = decodedToken;
        const { email, firstName, lastName, location, phoneNumber1, phoneNumber2, pin } = address;
        // let chatID;
        // bot.on('message', (msg) => {
        //     chatID = msg.chat.id;
        //     console.log("GROUP ID: ", chatID);
        // })
        bot.stopPolling();
        let ordereditems = '';
        items.forEach((item, index) => {
            ordereditems += `\n\n<i>Name</i> : <b>${item.name}</b>\n\n<i>Weight_Variant</i> : <b>${item.weight}</b>\n\n<i>Quantity</i> : <b>${item.quantity}</b>\n\n\n`
        });
        let botResponse = `<i>Order_ID</i> : <b>${orderID}</b>\n\n<i>Payment_ID</i> : <b>${paymentID}</b>\n\n<i>Payment_mode</i> : <b>${paymentMode}</b>\n\n<i>Total Amount</i> : <b>${totalAmount}</b>\n\n<i>Time_of_Order</i> : <b>${time}</b>\n\n<i>Address</i> : <b>${firstName} ${lastName}</b>,\n <b>${email}</b>,\n <b>${phoneNumber1} ${phoneNumber2}</b>,\n <b>${location}</b>,\n <b>${pin}</b>\n\n\n<i>logged_In_Number</i> : <b>${phone_number}</b>\n\n<i>uid</i> : <b>${uid}</b>\n\n<i>Orders</i> : ${ordereditems}\n\n<i>Delivered</i> : ${delivered}`;
        // botResponse = botResponse.replace(/\./g, '\\.');
        // botResponse = botResponse.replace(/\+/g, '\\+');

        bot.sendMessage("-1001633096856", botResponse, {parse_mode: "HTML"}).then(response => {
            res.status(200).json({
                status: 200,
                message: "message sent successfully"
            })
        })
    }
    else{
        res.status(405).json({
            status: 405,
            message: "only POST allowed"
        })
    }
}

export default apimiddleware(handler);

