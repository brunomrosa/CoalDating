/* eslint-disable no-param-reassign */
interface userLocation {
  lat: number;
  lon: number;
}

export default new (class AuthenticateUserService {
  public async execute(list: userLocation[]): Promise<number> {
    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    function getDistanceFromLatLonInKm(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
    ) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d: number = R * c; // Distance in km
      return d;
    }

    const response = Number(
      getDistanceFromLatLonInKm(
        list[0].lat,
        list[0].lon,
        list[1].lat,
        list[1].lon,
      ).toFixed(1),
    );

    return response;
  }
})();
