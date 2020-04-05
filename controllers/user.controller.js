const User = require('../models/User');
const Artist = require('../models/Artist');

exports.getFavoriteArtists = async (req, res, next) => {
  // db에서 artist 정보를 가져와서 화면에 뿌려주기
  // 뿌려줄 때, 기존에 user가 좋아하는 가수 체크했을 경우 표시해주기
  const { userId } = res.locals;

  try {
    const artistList = await Artist.find().select('-spotify_artist_id -tracks -genres');
    res.status(200).json({ artistList });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

// {
//   favorite_artists: [],
//   favorite_tracks: [],
//   _id: 5e87f20eb5832f07a290c6d5,
//   username: 'soldonii',
//   gender: 'male',
//   email: 'dhs0113@gmail.com',
//   password: '$2a$12$XURdK9Vywan54/rxPLWqNOUXOWHyhpbBFTGWfq4EUN9z0/cSo5dAe',
//   thumbnail_url: 'https://musicnerd.s3.ap-northeast-2.amazonaws.com/user_profile/m_profile1.png',
//   play_log: [],
//   __v: 0
// }
// [
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/bdaa41bab49fb5b4152363706cb14eba62016eb7',
//       width: 640
//     },
//     name: [ 'crush', '크러쉬', '크러시' ],
//     genres: [ 'k-pop', 'korean r&b' ],
//     _id: 5e8767db5e19054fab005f63,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/4d777945b8f9f915ebf55d7cc3f76f4405adf2dd',
//       width: 640
//     },
//     name: [ '자이언티', 'ziont', 'zion.t' ],
//     genres: [ 'k-hop', 'k-indie', 'k-pop', 'korean pop', 'korean r&b' ],
//     _id: 5e8767de5e19054fab005f6a,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/853b1c7e60b3231eafe65ffee579f864042e817b',
//       width: 640
//     },
//     name: [ '에픽하이', 'epik high' ],
//     genres: [ 'k-hop', 'k-indie', 'k-pop', 'korean pop' ],
//     _id: 5e8767e05e19054fab005f71,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/5f32ee93eec29ef6d8a1cbe61261f5d7c4f9132c',
//       width: 640
//     },
//     name: [ '악동뮤지션', '악뮤' ],
//     genres: [ 'k-pop', 'korean pop' ],
//     _id: 5e8767e25e19054fab005f78,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273c06f0e8b33ac2d246158253e',
//       width: 640
//     },
//     name: [ '아이유', 'IU' ],
//     genres: [ 'k-pop', 'korean pop' ],
//     _id: 5e8767e55e19054fab005f7f,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/0c9057cb30520f9f883a220051260fc66a2f3ffa',
//       width: 640
//     },
//     name: [ '방탄소년단', '방탄', 'BTS' ],
//     genres: [ 'k-pop', 'k-pop boy group' ],
//     _id: 5e8767e75e19054fab005f86,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/9a9e9301d3492dc86cb7bc8c021cd1d97cc5e214',
//       width: 640
//     },
//     name: [ '백예린' ],
//     genres: [ 'k-indie', 'k-pop', 'korean pop' ],
//     _id: 5e8767e95e19054fab005f8d,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b27326eed5eb584f81aace7a1793',
//       width: 640
//     },
//     name: [ '버스커버스커', 'busker busker' ],
//     genres: [ 'k-indie', 'korean pop' ],
//     _id: 5e8767eb5e19054fab005f94,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 1334,
//       url: 'https://i.scdn.co/image/2ea21966c652e0ba25eb3d106f0e8aa67f3070d7',
//       width: 1000
//     },
//     name: [ '싸이', 'psy' ],
//     genres: [ 'k-hop', 'k-pop' ],
//     _id: 5e8767ed5e19054fab005f9b,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273b4caec66672b0644db6516db',
//       width: 640
//     },
//     name: [ '빈지노', 'beenzino' ],
//     genres: [ 'k-hop', 'k-indie', 'korean pop', 'korean r&b' ],
//     _id: 5e8767ef5e19054fab005fa1,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/43f07dafea4f8ebad9cd5fb023db9d23f77c4140',
//       width: 640
//     },
//     name: [ '소녀시대', "Girl's generation" ],
//     genres: [ 'j-idol', 'k-pop', 'k-pop girl group' ],
//     _id: 5e8767f15e19054fab005fa7,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273d94a1f4ae80508762cf3c1d4',
//       width: 640
//     },
//     name: [ '윤미래' ],
//     genres: [ 'k-pop', 'korean pop', 'korean r&b' ],
//     _id: 5e8767f35e19054fab005fae,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/29e1fb0593d84c221e9447c6da7da5eff203e37a',
//       width: 640
//     },
//     name: [ '빅뱅', 'BIGBANG' ],
//     genres: [ 'k-pop', 'k-pop boy group' ],
//     _id: 5e8767f65e19054fab005fb4,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273a368db7ac39a2220f2e7a8f6',
//       width: 640
//     },
//     name: [ 'g.o.d.', 'g.o.d', '지오디', '쥐오디', 'god' ],
//     genres: [ 'k-pop boy group', 'korean pop', 'world worship' ],
//     _id: 5e8767f85e19054fab005fbb,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273d37f7121912ce768f789c7c3',
//       width: 640
//     },
//     name: [ 'hot', 'h.o.t.', 'h.o.t', '에쵸티', '에이치오티' ],
//     genres: [],
//     _id: 5e8767fa5e19054fab005fc2,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/10f4fc34d333e053558d9ec57fdd1802cde4901c',
//       width: 640
//     },
//     name: [ '볼빨간사춘기' ],
//     genres: [ 'k-pop', 'korean pop' ],
//     _id: 5e8767fc5e19054fab005fc9,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 1000,
//       url: 'https://i.scdn.co/image/f84d5cb6a449134391603c123a470d043892ce79',
//       width: 1000
//     },
//     name: [ '마마무', 'MAMAMOO' ],
//     genres: [ 'k-pop', 'k-pop girl group' ],
//     _id: 5e8767fe5e19054fab005fcf,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b27364953ee2798ff2903094e829',
//       width: 640
//     },
//     name: [ '다이나믹듀오', '다듀', 'dynamic duo' ],
//     genres: [ 'k-hop', 'k-indie', 'k-pop', 'korean pop', 'korean r&b' ],
//     _id: 5e8768005e19054fab005fd5,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273f4b5ad24d1630deb5016f6ce',
//       width: 640
//     },
//     name: [ '버즈', 'buzz' ],
//     genres: [],
//     _id: 5e8768025e19054fab005fdb,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/9174b8dfdc8b37fd372c71d34c2a53c6baf36132',
//       width: 640
//     },
//     name: [ '윤도현', '윤도현밴드', 'yb' ],
//     genres: [ 'korean indie rock' ],
//     _id: 5e8768035e19054fab005fe0,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/254b0e0fc1d4cf39de56960ed983c1ff7e3dff00',
//       width: 640
//     },
//     name: [ '블랙핑크', 'Black Pink' ],
//     genres: [ 'k-pop', 'k-pop girl group' ],
//     _id: 5e8768045e19054fab005fe3,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/fce0ad2e7b3a91ddcdc219f6ef5970324e0d26d6',
//       width: 640
//     },
//     name: [ 'ph-1', 'ph_1', '피에이치원', 'ph1' ],
//     genres: [ 'k-hop', 'korean pop', 'korean r&b' ],
//     _id: 5e8768065e19054fab005fe9,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b2737aa6fed8cef4df1c76f7f890',
//       width: 640
//     },
//     name: [ '이승기' ],
//     genres: [ 'korean pop' ],
//     _id: 5e8768085e19054fab005fef,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b27354b258fb3ef6ebbd06c1a945',
//       width: 640
//     },
//     name: [ '에일리', 'Ailee' ],
//     genres: [ 'k-pop', 'korean pop' ],
//     _id: 5e87680a5e19054fab005ff2,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b2737d60ab8efdba2818b5437a61',
//       width: 640
//     },
//     name: [ '핑클', '핀클', 'fin.k.l.', 'finkl' ],
//     genres: [ 'k-pop girl group', 'korean pop' ],
//     _id: 5e87680c5e19054fab005ff8,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b2730ae7ef733837fb782ff73c7b',
//       width: 640
//     },
//     name: [ 's.e.s.', 's.e.s', 'ses', '에스이에스' ],
//     genres: [ 'k-pop girl group' ],
//     _id: 5e87680e5e19054fab005ffe,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273ccd48b6feae0e905908c0046',
//       width: 640
//     },
//     name: [ '거미' ],
//     genres: [ 'k-pop', 'korean pop' ],
//     _id: 5e87680f5e19054fab006003,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab67616d0000b273cd17c315097d81ea0882430c',
//       width: 640
//     },
//     name: [ '청하' ],
//     genres: [ 'k-pop' ],
//     _id: 5e8768105e19054fab006007,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/c76b8988d4b5ac8bf6e2aad8abec0950d074c9a6',
//       width: 640
//     },
//     name: [ '샤이니', 'Shinee' ],
//     genres: [ 'k-pop', 'k-pop boy group' ],
//     _id: 5e8768125e19054fab00600c,
//     __v: 0
//   },
//   {
//     thumbnail: {
//       height: 640,
//       url: 'https://i.scdn.co/image/76f0a6ebc5f5595d21756e66429aa16225e09204',
//       width: 640
//     },
//     name: [ '레드벨벳', 'Red Velvet' ],
//     genres: [ 'k-pop', 'k-pop girl group' ],
//     _id: 5e8768145e19054fab006011,
//     __v: 0
//   }
// ]

