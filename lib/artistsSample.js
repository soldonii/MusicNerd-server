const sampleArtists = [
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/7IrDIIq3j04exsiF3Z7CPg' },
    followers: { href: null, total: 81470 },
    genres: [ 'k-hop', 'k-indie', 'korean pop', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/7IrDIIq3j04exsiF3Z7CPg',
    id: '7IrDIIq3j04exsiF3Z7CPg',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b273b4caec66672b0644db6516db',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02b4caec66672b0644db6516db',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d00004851b4caec66672b0644db6516db',
        width: 64
      }
    ],
    name: 'Beenzino',
    popularity: 49,
    type: 'artist',
    uri: 'spotify:artist:7IrDIIq3j04exsiF3Z7CPg'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/5snNHNlYT2UrtZo5HCJkiw' },
    followers: { href: null, total: 346130 },
    genres: [ 'k-hop', 'k-indie', 'k-pop', 'korean pop' ],
    href: 'https://api.spotify.com/v1/artists/5snNHNlYT2UrtZo5HCJkiw',
    id: '5snNHNlYT2UrtZo5HCJkiw',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/853b1c7e60b3231eafe65ffee579f864042e817b',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/d718e4d40e659103edd3e1b5e669d70bedc17483',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/69aceafab45e996f5f25e32de0ec491324a0070d',
        width: 160
      }
    ],
    name: 'Epik High',
    popularity: 58,
    type: 'artist',
    uri: 'spotify:artist:5snNHNlYT2UrtZo5HCJkiw'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/0siBQaURCli5wn2lqv8WZg' },
    followers: { href: null, total: 274716 },
    genres: [ 'k-pop', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/0siBQaURCli5wn2lqv8WZg',
    id: '0siBQaURCli5wn2lqv8WZg',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/871d6a3b58596006062dbf16ed6d149b7a88c410',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/5f7bf525f25e2c94cacbbffddcc1e04eca1168c4',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/7def7a9f6385853caf1c3c97f07a6c5bc6705bfa',
        width: 160
      }
    ],
    name: 'DPR LIVE',
    popularity: 63,
    type: 'artist',
    uri: 'spotify:artist:0siBQaURCli5wn2lqv8WZg'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/2u7CP5T30c8ctenzXgEV1W' },
    followers: { href: null, total: 103476 },
    genres: [ 'k-hop', 'korean pop', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/2u7CP5T30c8ctenzXgEV1W',
    id: '2u7CP5T30c8ctenzXgEV1W',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/fce0ad2e7b3a91ddcdc219f6ef5970324e0d26d6',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/b584af5cb9c9d90512bceeb0d9f16ac6d98c352f',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/d7b7fcdf0df401563db6253fc0c5b85bd71ebc36',
        width: 160
      }
    ],
    name: 'pH-1',
    popularity: 58,
    type: 'artist',
    uri: 'spotify:artist:2u7CP5T30c8ctenzXgEV1W'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/2MtHuR0W2idZdF7x4wddqq' },
    followers: { href: null, total: 105599 },
    genres: [ 'k-hop', 'k-indie', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/2MtHuR0W2idZdF7x4wddqq',
    id: '2MtHuR0W2idZdF7x4wddqq',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b27375fa3e61229887e1054fa6cf',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e0275fa3e61229887e1054fa6cf',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d0000485175fa3e61229887e1054fa6cf',
        width: 64
      }
    ],
    name: 'Giriboy',
    popularity: 57,
    type: 'artist',
    uri: 'spotify:artist:2MtHuR0W2idZdF7x4wddqq'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU' },
    followers: { href: null, total: 1316837 },
    genres: [ 'k-pop', 'korean pop' ],
    href: 'https://api.spotify.com/v1/artists/3HqSLMAZ3g3d5poNaI7GOU',
    id: '3HqSLMAZ3g3d5poNaI7GOU',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b273c06f0e8b33ac2d246158253e',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02c06f0e8b33ac2d246158253e',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d00004851c06f0e8b33ac2d246158253e',
        width: 64
      }
    ],
    name: 'IU',
    popularity: 72,
    type: 'artist',
    uri: 'spotify:artist:3HqSLMAZ3g3d5poNaI7GOU'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/6aLdhHUqgdKE86xbtNmY8g' },
    followers: { href: null, total: 544943 },
    genres: [ 'k-pop', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/6aLdhHUqgdKE86xbtNmY8g',
    id: '6aLdhHUqgdKE86xbtNmY8g',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/bdaa41bab49fb5b4152363706cb14eba62016eb7',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/e98851d19a01561b13bdd2563e901277960df25e',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/ef72c96eaf97b30d6c75aaf961a334bf71afc3a2',
        width: 160
      }
    ],
    name: 'Crush',
    popularity: 69,
    type: 'artist',
    uri: 'spotify:artist:6aLdhHUqgdKE86xbtNmY8g'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/5HenzRvMtSrgtvU16XAoby' },
    followers: { href: null, total: 346489 },
    genres: [ 'k-hop', 'k-indie', 'k-pop', 'korean pop', 'korean r&b' ],
    href: 'https://api.spotify.com/v1/artists/5HenzRvMtSrgtvU16XAoby',
    id: '5HenzRvMtSrgtvU16XAoby',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/4d777945b8f9f915ebf55d7cc3f76f4405adf2dd',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/89473560ed04686f60b8766d5fa7127fde8f5ad4',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/099898f92b048b1650af5003949b04c4eac3b342',
        width: 160
      }
    ],
    name: 'Zion.T',
    popularity: 59,
    type: 'artist',
    uri: 'spotify:artist:5HenzRvMtSrgtvU16XAoby'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/6OwKE9Ez6ALxpTaKcT5ayv' },
    followers: { href: null, total: 506249 },
    genres: [ 'k-pop', 'korean pop' ],
    href: 'https://api.spotify.com/v1/artists/6OwKE9Ez6ALxpTaKcT5ayv',
    id: '6OwKE9Ez6ALxpTaKcT5ayv',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/5f32ee93eec29ef6d8a1cbe61261f5d7c4f9132c',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/52145d311972d028da4595635564c6c93d1f64a3',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/fd6692c0108fedbf15cda8ae70b53c9f5b71873f',
        width: 160
      }
    ],
    name: 'AKMU',
    popularity: 61,
    type: 'artist',
    uri: 'spotify:artist:6OwKE9Ez6ALxpTaKcT5ayv'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/6jgrgDBt1SbtNbc25sLaTH' },
    followers: { href: null, total: 3990 },
    genres: [ 'k-indie', 'korean pop' ],
    href: 'https://api.spotify.com/v1/artists/6jgrgDBt1SbtNbc25sLaTH',
    id: '6jgrgDBt1SbtNbc25sLaTH',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b27326eed5eb584f81aace7a1793',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e0226eed5eb584f81aace7a1793',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d0000485126eed5eb584f81aace7a1793',
        width: 64
      }
    ],
    name: 'Busker Busker',
    popularity: 37,
    type: 'artist',
    uri: 'spotify:artist:6jgrgDBt1SbtNbc25sLaTH'
  },
  {
    external_urls: { spotify: 'https://open.spotify.com/artist/6dhfy4ByARPJdPtMyrUYJK' },
    followers: { href: null, total: 101548 },
    genres: [ 'k-indie', 'k-pop', 'korean pop' ],
    href: 'https://api.spotify.com/v1/artists/6dhfy4ByARPJdPtMyrUYJK',
    id: '6dhfy4ByARPJdPtMyrUYJK',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/9a9e9301d3492dc86cb7bc8c021cd1d97cc5e214',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/2ac8d22a15ee5075a83299c447ba25da4e653274',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/288f6755898990be1d9a40bd0c008d247134ecc7',
        width: 160
      }
    ],
    name: 'Yerin Baek',
    popularity: 63,
    type: 'artist',
    uri: 'spotify:artist:6dhfy4ByARPJdPtMyrUYJK'
  }
]
