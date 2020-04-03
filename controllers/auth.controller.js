const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, gender, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errorMessage: '이미 존재하는 email입니다. 다른 email로 시도해 주세요.'
      });
    }

    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          errorMessage: '유저 정보를 저장하던 도중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
        });
      }

      const newUser = await User.create({
        username,
        gender,
        email,
        password: hashedPassword,
        thumbnail_url: gender === 'male' ?
          `${process.env.AMAZON_S3_URI}/user_profile/m_profile${Math.floor(Math.random()*3)}.png` :
          `${process.env.AMAZON_S3_URI}/user_profile/f_profile${Math.floor(Math.random()*3)}.png`,
        favorite_artists: [],
        favorite_songs: [],
        play_log: []
      });

      const payload = { userId: newUser._id };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 },
        (err, token) => {
          if (err) {
            return res.status(500).json({
              errorMessage: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
            });
          }

          res.status(200).json({ token });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errorMessage: '존재하지 않는 유저입니다. email 주소를 다시 확인해주세요.'
      });
    }

    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!passwordValidation) {
      return res.status(400).json({
        errorMessage: '올바르지 않은 비밀번호입니다. 비밀번호를 다시 확인해주세요.'
      });
    }

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 1000 * 60 * 60 },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            errorMessage: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
          });
        }

        res.status(200).json({
          token,
          userId: user._id
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      errorMessage: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
};

exports.logout = (req, res, next) => {

};
