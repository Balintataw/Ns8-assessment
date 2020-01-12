const axios = {
  get: jest.fn(() => Promise.resolve({ data: [] })),
  create: () => axios,
  getAllUsers: jest.fn(),
  defaults: {
    adapter: {}
  }
};

export default axios;
