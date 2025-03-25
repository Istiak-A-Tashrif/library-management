/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { create } from 'domain';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeederService {
  constructor(private readonly prismaService: PrismaService) {}

  async seederExecute(model: string) {


    // if (model === 'category') {
    //   const deleteAllCategory = await this.prismaService.category.deleteMany();

    //   const data = [
    //     {
    //       name: 'Men',
    //       image:
    //         'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //       slug: 'men',
    //       Category: {
    //         create: [
    //           {
    //             name: 'New In',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'new-in',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Featured Products',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'featured-products',
    //                 },
    //                 {
    //                   name: 'Latest Trends',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'latest-trends',
    //                 },
    //                 {
    //                   name: 'Top Picks',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'top-picks',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Clothing',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'clothing',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'T-shirts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 't-shirts',
    //                 },
    //                 {
    //                   name: 'Jackets',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jackets',
    //                 },
    //                 {
    //                   name: 'Jeans',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jeans',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Shoes',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'shoes',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sneakers',
    //                 },
    //                 {
    //                   name: 'Boots',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'boots',
    //                 },
    //                 {
    //                   name: 'Sandals',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sandals',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Accessories',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'accessories',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Watches',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'watches',
    //                 },
    //                 {
    //                   name: 'Bags',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'bags',
    //                 },
    //                 {
    //                   name: 'Belts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'belts',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Sport',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'sports',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Sportswear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sportswear',
    //                 },
    //                 {
    //                   name: 'Outdoor Gear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'outdoor-gear',
    //                 },
    //                 {
    //                   name: 'Fitness Equipment',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'fitness-equipment',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Gifts',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'gifts',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Personalized Gifts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'personalized-gifts',
    //                 },
    //                 {
    //                   name: 'Gift Sets',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'gift-sets',
    //                 },
    //                 {
    //                   name: 'Cards',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'cards',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Brands',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'brands',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Luxury Brands',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'luxury-brands',
    //                 },
    //                 {
    //                   name: 'Street Brands',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'street-brands',
    //                 },
    //                 {
    //                   name: 'Exclusive Brands',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'exclusive-brands',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Designer',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'designer',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Designer Accessories',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'designer-accessories',
    //                 },
    //                 {
    //                   name: 'Event Dressing',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'event-dressing',
    //                 },
    //                 {
    //                   name: 'Luxury Pieces',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'luxury-pieces',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Sneakerhub',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'Sneakerhub',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Casual Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'casual-sneakers',
    //                 },
    //                 {
    //                   name: 'Sports Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sports-sneakers',
    //                 },
    //                 {
    //                   name: 'High-Tops',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'high-tops',
    //                 },
    //                 {
    //                   name: 'Running Shoes',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'running-shoes',
    //                 },
    //                 {
    //                   name: 'Limited Edition',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'limited-edition',
    //                 },
    //               ],
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: 'Women',
    //       image:
    //         'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //       slug: 'women',
    //       Category: {
    //         create: [
    //           {
    //             name: 'New In',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'new-in',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Featured Products',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'featured-products',
    //                 },
    //                 {
    //                   name: 'Latest Trends',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'latest-trends',
    //                 },
    //                 {
    //                   name: 'Top Picks',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'top-picks',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Clothing',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'clothing',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Dresses',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'dresses',
    //                 },
    //                 {
    //                   name: 'Tops',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'tops',
    //                 },
    //                 {
    //                   name: 'Jeans',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jeans',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Shoes',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'shoes',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Heels',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'heels',
    //                 },
    //                 {
    //                   name: 'Flats',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'flats',
    //                 },
    //                 {
    //                   name: 'Boots',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'boots',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Accessories',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'accessories',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Bags',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'bags',
    //                 },
    //                 {
    //                   name: 'Jewelry',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jewelry',
    //                 },
    //                 {
    //                   name: 'Belts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'belts',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Sport',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'sport',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Activewear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'activewear',
    //                 },
    //                 {
    //                   name: 'Running Gear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'running Gear',
    //                 },
    //                 {
    //                   name: 'Yoga',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'yoga',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Gifts',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'gifts',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Gift Sets',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'gift-sets',
    //                 },
    //                 {
    //                   name: 'Personalized Gifts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'personalized-gifts',
    //                 },
    //                 {
    //                   name: 'Luxury Gifts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'luxury-gifts',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Brands',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'brands',

    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Chanel',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'chanel',
    //                 },
    //                 {
    //                   name: 'Gucci',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'gucci',
    //                 },
    //                 {
    //                   name: 'Prada',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'prada',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Designer',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'designer',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Luxury Designers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'luxury-designers',
    //                 },
    //                 {
    //                   name: 'Contemporary Designers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'contemporary Designers',
    //                 },
    //                 {
    //                   name: 'Emerging Designers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'emerging-designers',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Sneakerhub',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'sneakerhub',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Casual Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'casual-sneakers',
    //                 },
    //                 {
    //                   name: 'Sports Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sports-sneakers',
    //                 },
    //                 {
    //                   name: 'High-Tops',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'high-tops',
    //                 },
    //               ],
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: 'Sports',
    //       image:
    //         'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //       slug: 'sports',
    //       Category: {
    //         create: [
    //           {
    //             name: 'Last',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'last',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'New Equipment',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'new-equipment',
    //                 },
    //                 {
    //                   name: 'Seasonal Gear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'seasonal-gear',
    //                 },
    //                 {
    //                   name: 'Best Sellers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'best-sellers',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Women',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'women',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Athletic Wear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'athletic-wear',
    //                 },
    //                 {
    //                   name: 'Footwear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'footwear',
    //                 },
    //                 {
    //                   name: 'Accessories',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'accessories',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Men',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'men',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Activewear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'activewear',
    //                 },
    //                 {
    //                   name: 'Equipment',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'equipment',
    //                 },
    //                 {
    //                   name: 'Footwear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'footwear',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Kids',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'kids',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Baby Gear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'baby-gear',
    //                 },
    //                 {
    //                   name: 'Youth Sports',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'youth-sports',
    //                 },
    //                 {
    //                   name: 'Sports Toys',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sports-toys',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Brands',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'brands',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Nike',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'nike',
    //                 },
    //                 {
    //                   name: 'Adidas',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'adidas',
    //                 },
    //                 {
    //                   name: 'Under Armour',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'under-armour',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Activity',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'activity',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Yoga',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'yoga',
    //                 },
    //                 {
    //                   name: 'Running',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'running',
    //                 },
    //                 {
    //                   name: 'Cycling',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'cycling',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Tech & Accessories',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'tech-&-accessories',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Fitness Trackers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'fitness-trackers',
    //                 },
    //                 {
    //                   name: 'Smartwatches',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'smartwatches',
    //                 },
    //                 {
    //                   name: 'Wireless Earbuds',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'wireless-earbuds',
    //                 },
    //               ],
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: 'Kids',
    //       image:
    //         'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //       slug: 'kids',
    //       Category: {
    //         create: [
    //           {
    //             name: 'New In',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'new-in',

    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Newborn Essentials',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'newborn-essentials',
    //                 },
    //                 {
    //                   name: 'Seasonal Picks',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'Seasonal-picks',
    //                 },
    //                 {
    //                   name: 'Latest Toys',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'latest-toys',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Baby',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'baby',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Baby Clothes',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'baby-clothes',
    //                 },
    //                 {
    //                   name: 'Diapering',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'diapering',
    //                 },
    //                 {
    //                   name: 'Baby Gear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'baby-gear',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Girls',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'girls',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Dresses',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'dresses',
    //                 },
    //                 {
    //                   name: 'Skirts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'skirts',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Boys',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'boys',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'T-shirts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 't-shirts',
    //                 },
    //                 {
    //                   name: 'Jeans',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jeans',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Teen Girls',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'teen-girls',

    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Teen Fashion',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'teen-fashion',
    //                 },
    //                 {
    //                   name: 'Accessories',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'accessories',
    //                 },
    //                 {
    //                   name: 'School Supplies',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'school-supplies',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Teen Boys',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'teen-boys',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Streetwear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'streetwear',
    //                 },
    //                 {
    //                   name: 'Sportswear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sportswear',
    //                 },
    //                 {
    //                   name: 'Footwear',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'footwear',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Toys',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'toys',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Action Figures',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'action-figures',
    //                 },
    //                 {
    //                   name: 'Educational Toys',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'educational-toys',
    //                 },
    //                 {
    //                   name: 'Soft Toys',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'soft-toys',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Shoes',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'shoes',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Sneakers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sneakers',
    //                 },
    //                 {
    //                   name: 'Boots',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'boots',
    //                 },
    //                 {
    //                   name: 'Sandals',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sandals',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Accessories',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'accessories',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Hats',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'hats',
    //                 },
    //                 {
    //                   name: 'Backpacks',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'backpacks',
    //                 },
    //                 {
    //                   name: 'Jewelry',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'jewelry',
    //                 },
    //               ],
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: 'Beauty',
    //       image:
    //         'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //       slug: 'beauty',
    //       Category: {
    //         create: [
    //           {
    //             name: 'Last',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'last',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Moisturizers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'moisturizers',
    //                 },
    //                 {
    //                   name: 'Cleansers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'cleansers',
    //                 },
    //                 {
    //                   name: 'Sunscreen',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'sunscreen',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Makeup',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'makeup',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Foundations',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'foundations',
    //                 },
    //                 {
    //                   name: 'Lip Care',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'lip-care',
    //                 },
    //                 {
    //                   name: 'Eye Makeup',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'eye-makeup',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Fragrance',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'fragrance',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Perfumes',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'perfumes',
    //                 },
    //                 {
    //                   name: 'Body Sprays',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'body-sprays',
    //                 },
    //                 {
    //                   name: 'Essential Oils',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'essential-oils',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Hair',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'hair',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Shampoos',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'shampoos',
    //                 },
    //                 {
    //                   name: 'Conditioners',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'conditioners',
    //                 },
    //                 {
    //                   name: 'Hair Treatments',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'hair-treatments',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Bath & Body',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'bath-&-body',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Body Wash',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'body-wash',
    //                 },
    //                 {
    //                   name: 'Scrubs',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'scrubs',
    //                 },
    //                 {
    //                   name: 'Moisturizers',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'moisturizers',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Wellness',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'wellness',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Supplements',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'supplements',
    //                 },
    //                 {
    //                   name: 'Essential Oils',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'essential-oils',
    //                 },
    //                 {
    //                   name: 'Aromatherapy',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'aromatherapy',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Grooming',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'grooming',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Shaving',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'shaving',
    //                 },
    //                 {
    //                   name: 'Beard Care',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'beard-care',
    //                 },
    //                 {
    //                   name: 'Hair Removal',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'hair-removal',
    //                 },
    //               ],
    //             },
    //           },
    //           {
    //             name: 'Gifts',
    //             image:
    //               'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //             slug: 'gifts',
    //             Category: {
    //               create: [
    //                 {
    //                   name: 'Gift Sets',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'gift-sets',
    //                 },
    //                 {
    //                   name: 'Travel Kits',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'travel-kits',
    //                 },
    //                 {
    //                   name: 'Personalized Gifts',
    //                   image:
    //                     'http://res.cloudinary.com/dflj9rkgf/image/upload/v1729509593/uqwunkz6mil253oz1iik.webp',
    //                   slug: 'personalized-gifts',
    //                 },
    //               ],
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   ];

    //   for (let i = 0; i < data?.length; i++) {
    //     const item = data[i];

    //     await this.prismaService.category.create({ data: item });
    //   }
    // }

  }
}
