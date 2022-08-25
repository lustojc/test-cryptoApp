import { fetchCoins } from '../../store/slices/coinSlice';

describe('fetch coins', () => {
  it('should fetchCoins with resolved response', async () => {
    const dispatch = jest.fn();
    const thunk = fetchCoins();

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('coins/fetchAll/pending');
    expect(end[0].type).toBe('coins/fetchAll/fulfilled');
  });
});
