module.exports = {
  src: 'source/',
  dest: 'dist/',
  server: {
    port: 8888,
    path: 'dist/',
    lr: true,
  },
  remote: {
    host: '',
    dest: '',
    user: process.env.RSYNC_USERNAME || false,
  },
};
