const Razorpay = require('razorpay');
const shortid = require('shortid');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});



exports.initiatePayment = async (req, res) => {
  const { amount } = req.body;

  const payment_capture = 1;
  const currency = "INR";

  const options = {
    amount:amount*100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    const order_id=response.id
    const filePath =__dirname+'../frontend/payment.html';

    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
    .sendFile(filePath, {
  headers: {
    'orderId': order_id
  }
});
  } catch (err) {
    console.log(err);
  }



};

// Controller action for verifying the payment status
exports.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  try {
    // Verify the payment signature
    const hmac = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET');
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment signature is valid, proceed with payment verification

      // Fetch the payment details from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      // Check payment status
      if (payment.status === 'captured') {
        // Payment is successful
        res.json({
          success: true,
          message: 'Payment successful'
        });
      } else {
        // Payment failed or pending
        res.json({
          success: false,
          message: 'Payment failed or pending'
        });
      }
    } else {
      // Payment signature is invalid
      res.json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Razorpay payment verification error:', error);
    res.status(500).json({
      message: 'Failed to verify Razorpay payment'
    });
  }
};
