import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = new Country();
    country.code = code;
    country.name = name;
    country.emoji = emoji;
    country.continent = continent;
    await country.save();

    return country;
  }

  @Query(() => [Country])
  async getCountries() {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => Country)
  async getOneCountryByCode(@Arg("code") code: string): Promise<Country> {
    const country = await Country.findOne({
      where: { code },
    });

    if (!country) {
      throw new Error("No country found with this code");
    }
    return country;
  }
  @Query(() => [Country])
  async getCountriesByContinent(@Arg("continent") continent: string): Promise<Country[]> {
    const countries = await Country.find({
      where: { continent },
    });

    return countries;
  }
}
