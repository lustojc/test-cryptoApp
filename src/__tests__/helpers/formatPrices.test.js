import { formatLowPrice, formatPrices } from '../../libs/helpers/formatPrices';

describe('format prices fn', () => {
  it('format trillions', () => {
    expect(formatPrices('945698431545821')).toBe('945.70t');
    expect(formatPrices('135617512454523')).toBe('135.62t');
    expect(formatPrices('74224486223415')).toBe('74.22t');
    expect(formatPrices('3447997723000')).toBe('3.45t');
  });

  it('format billions', () => {
    expect(formatPrices('964599772300')).toBe('964.60b');
    expect(formatPrices('42315040165')).toBe('42.32b');
    expect(formatPrices('4812148587')).toBe('4.81b');
  });

  it('format millions', () => {
    expect(formatPrices('904871245')).toBe('904.87m');
    expect(formatPrices('67454752')).toBe('67.45m');
    expect(formatPrices('1045656')).toBe('1.05m');
  });

  it('format thousands', () => {
    expect(formatPrices('773145')).toBe('773.14k');
    expect(formatPrices('15478')).toBe('15.48k');
    expect(formatPrices('3451')).toBe('3.45k');
  });

  it('format different stranges values', () => {
    expect(formatPrices('00455')).toBeNull();
    expect(formatPrices('0')).toBeNull();
    expect(formatPrices('sdfsdf')).toBeNull();
  });

  it('format low values', () => {
    expect(formatLowPrice(null)).toBe('  -');
    expect(formatLowPrice(0)).toBe('0');
    expect(formatLowPrice(1)).toBe('1.00');
    expect(formatLowPrice(6945)).toBe('6945.00');
    expect(formatLowPrice(0.6)).toBe('0.60');
    expect(formatLowPrice(0.1)).toBe('0.10');
    expect(formatLowPrice(0.04)).toBe('0.04');
    expect(formatLowPrice(0.001454)).toBe('0.0015');
    expect(formatLowPrice(0.00454541)).toBe('0.0045');
  });
});
