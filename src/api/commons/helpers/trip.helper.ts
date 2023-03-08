enum Fees {
  BASE = 3500,
  DISTANCE = 1000,
  DURATION = 200,
}

export const distanceToKilometers = (distanceInMeters: number): number => Number((distanceInMeters / 1000).toFixed(1));

export const durationToMinutes = (durationInSeconds: number): number => Number((durationInSeconds / 60).toFixed(1));

export const calculateFare = (distance: number, duration: number): number => {
  const distanceFee = distance * Fees.DISTANCE;
  const durationFee = duration * Fees.DURATION;

  return distanceFee + durationFee + Fees.BASE;
};

export const transformFareToCurrency = (fare: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  }).format(fare);
