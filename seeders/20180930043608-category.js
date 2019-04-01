const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('category', [
      {
        id: 1,
        name: '前端',
        pid: 0,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 2,
        name: ' 后端',
        pid: 0,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 3,
        name: 'UI',
        pid: 0,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 4,
        name: '其他',
        pid: 0,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'HTML/CSS',
        pid: 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'JavaScript/框架',
        pid: 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'php',
        pid: 2,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'node',
        pid: 2,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'ps',
        pid: 3,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: 'Java',
        pid: 4,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
