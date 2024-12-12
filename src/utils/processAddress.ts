import { citiesData } from "@/lib/cities";
import { districtsData } from "@/lib/districts";
import { wardsData } from "@/lib/wards";

function processAddress(address: string): string[] {
  const splittedAddress = address.split(",");
  const city = citiesData.find(
    (city) => city.name === splittedAddress[splittedAddress.length - 1],
  );
  const district = city
    ? districtsData[city.id].find(
        (district) =>
          district.name === splittedAddress[splittedAddress.length - 2],
      )
    : null;
  const ward = district
    ? wardsData[district.id].find(
        (ward) => ward.name === splittedAddress[splittedAddress.length - 3],
      )
    : null;
  return [
    splittedAddress[0],
    ward ? ward.id : "-1",
    district ? district.id : "-1",
    city ? city.id : "-1",
  ];
}

export { processAddress };
