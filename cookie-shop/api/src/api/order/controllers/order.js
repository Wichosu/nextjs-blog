'use strict';
const stripe = require('stripe')(process.env.STRIPE_KEY)

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async create(ctx){
    try{
      const {items} = ctx.request.body;
      const lineItems = await Promise.all(
        items.map(async product => {
          const item = await strapi
            .service('api::product.product')
            .findOne(product.id)

            return {
              price_data:{
                currency:"usd",
                product_data:{
                  name:item.title,
                  images:['https://images.pexels.com/photos/5239804/pexels-photo-5239804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
                },
                unit_amount:item.price*100
              },
              quantity:product.quantity
            }
        })
      )
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_SUCCESS}?success=true`,
        cancel_url: `${process.env.CLIENT_SUCCESS}?success=false`,
        line_items: lineItems,
        shipping_address_collection: {allowed_countries:['US', 'CA']},
        payment_method_types: ['card'],
      });

      await strapi.service('api::order.order').create({
        data:{
          items,
          stripeId: session.id
        }
      });

      return {stripeSession:session};

    } catch(err){
      ctx.response.status = 500;
      return {err};
    }
  }
}));
