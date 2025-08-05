// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Icon from 'components/icon';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import HelpHeader from 'features/help-center/customer-support/components/helpHeader';
import HelpFooter from 'features/help-center/customer-support/components/helpFooter';
import HelpPage from 'features/help-center/customer-support/components/helpPage';

const data = {
  faqData: {
    // payment
    payment: {
      id: 'payment',
      title: 'Payment',
      icon: 'tabler:credit-card',
      subtitle: 'Get help with payment',
      qandA: [
        {
          id: 'order-payment',
          question: 'When is payment taken for my order?',
          answer:
            'Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.'
        },
        {
          id: 'order',
          question: 'How do I pay for my order?',
          answer:
            'We accept Visa®, MasterCard®, American Express®, and PayPal®. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.'
        },
        {
          id: 'placing-order',
          question: "What should I do if I'm having trouble placing an order?",
          answer:
            'For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com'
        },
        {
          id: 'users-license',
          question: 'Which license do I need for an end product that is only accessible to paying users?',
          answer:
            'If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.'
        },
        {
          id: 'subscription-review',
          question: 'Does my subscription automatically renew?',
          answer:
            'No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps.'
        }
      ]
    },

    // delivery
    delivery: {
      id: 'delivery',
      title: 'Delivery',
      icon: 'tabler:briefcase',
      subtitle: 'Get help with delivery',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },

    // cancellation and return
    cancellationReturn: {
      id: 'cancellation-return',
      title: 'Cancellation & Return',
      icon: 'tabler:rotate-clockwise-2',
      subtitle: 'Get help with cancellation & return',
      qandA: [
        {
          id: 'cancel-order',
          question: 'Can I cancel my order?',
          answer:
            'Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund. Parcel delivery orders cannot be cancelled, however a free return label can be provided upon request.'
        },
        {
          id: 'product-return',
          question: 'Can I return my product?',
          answer:
            'You can return your product within 15 days of delivery, by contacting our support team, All merchandise returned must be in the original packaging with all original items.'
        },
        {
          id: 'return-status',
          question: 'Where can I view status of return?',
          answer: 'Locate the item from Your Orders. Select Return/Refund status'
        }
      ]
    },

    // my orders
    myOrders: {
      id: 'my-orders',
      icon: 'tabler:box',
      title: 'My Orders',
      subtitle: 'Order details',
      qandA: [
        {
          id: 'order-success',
          question: 'Has my order been successful?',
          answer:
            'All successful order transactions will receive an order confirmation email once the order has been processed. If you have not received your order confirmation email within 24 hours, check your junk email or spam folder. Alternatively, log in to your account to check your order summary. If you do not have a account, you can contact our Customer Care Team on 1-000-000-000.'
        },
        {
          id: 'promo-code',
          question: 'My Promotion Code is not working, what can I do?',
          answer: 'If you are having issues with a promotion code, please contact us at 1 000 000 000 for assistance.'
        },
        {
          id: 'track-orders',
          question: 'How do I track my Orders?',
          answer:
            'If you have an account just sign into your account from here and select “My Orders”. If you have a a guest account track your order from here using the order number and the email address.'
        }
      ]
    },

    // product and services
    productServices: {
      id: 'product-services',
      icon: 'tabler:settings',
      title: 'Product & Services',
      subtitle: 'Get help with product & services',
      qandA: [
        {
          id: 'shipping-notification',
          question: 'Will I be notified once my order has shipped?',
          answer: 'Yes, We will send you an email once your order has been shipped. This email will contain tracking and order information.'
        },
        {
          id: 'warranty-notification',
          question: 'Where can I find warranty information?',
          answer:
            'We are committed to quality products. For information on warranty period and warranty services, visit our Warranty section here.'
        },
        {
          id: 'warranty-coverage',
          question: 'How can I purchase additional warranty coverage?',
          answer:
            'For the peace of your mind, we offer extended warranty plans that add additional year(s) of protection to the standard manufacturer’s warranty provided by us. To purchase or find out more about the extended warranty program, visit Extended Warranty section here.'
        }
      ]
    }
  }
};

const Helps = () => {
  const [helps, setHelps] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [load, SetLoad] = useState(false);

  useEffect(() => {
    getAllHelps();
  }, [load]);

  const getAllHelps = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-management/platform-faqs/show`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setHelps(response.data.data);
        setActiveTab(response.data.data[0].module);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(helps);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const renderNoResult = (
    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', '& svg': { mr: 2 } }}>
      <Icon fontSize="1.5rem" icon="tabler:alert-circle" />
      <Typography variant="h5">No Results Found!!</Typography>
    </Box>
  );
  return (
    <Fragment>
      <HelpHeader data={data}/>
      {data !== null ? (
        <HelpPage SetLoad={SetLoad} data={data} helps={helps} activeTab={activeTab} handleChange={handleChange} />
      ) : (
        renderNoResult
      )}
      <HelpFooter />
    </Fragment>
  );
};

export default Helps;
