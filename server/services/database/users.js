const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

/**
 * This is used for testing the Client<->API connection, but this operation
 * won't be allowed in the final version of the project as it is a
 * security risk to expose all users
 */
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id,username, email, password FROM users",
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const getUserByEmail = email => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM users where email = $1",
      [email],
      (error, result) => {
        resolve(result.rows[0]);
      }
    );
  });
};

const createUser = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username ,email, password, profile_pic) values ($1, $2, $3,$4)",
      [
        username,
        email,
        password,
        "https://image.flaticon.com/icons/png/512/145/145987.png"
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const getUserById = id => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users where id = $1", [id], (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.rows[0]);
    });
  });
};

const updatePassword = ({ oldPassword, newPassword, email }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT password FROM users WHERE email = $1",
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.rowCount !== 1) {
          return reject(
            `User email ${email} not found or in database multiple times`
          );
        }
        if (oldPassword !== result.rows[0].password) {
          return reject(`Password for user ${email} is incorrect`);
        }
        pool.query(
          "UPDATE users SET password = $1 WHERE email = $2",
          [newPassword, email],
          (error, result) => {
            if (error) {
              console.error(error);
              return reject(error);
            }
            resolve(result.rows);
          }
        );
      }
    );
  });
};
const changeProfilePic = (newPictureLink, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE
      users
       SET 
      profile_pic = $1
      WHERE 
      id =$2`,
      [newPictureLink, userId],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers,
  updatePassword,
  changeProfilePic
};
