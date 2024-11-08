import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import InputField from "../../InputField/InputField";
import { CompanyProfileType } from "../../../types";
import { industrys } from "../../../utils/helper";
import { useRef } from "react";

const CompanyProfile = ({
  formData,
  errors,
  setFormData,
  handleChange,
}: CompanyProfileType) => {
  const libraries: any = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      // setFormData({ ...formData, location: place.formatted_address });
    }
  };

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Company Information</legend>
      <div className="flex flex-col">

        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Industry</label>
            <select
              name="industry"
              className={`border border-black rounded-md w-full p-2 ${
                errors?.industry && "border-red-600"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.industry}
            >
              <option value="">Select Industry</option>
              {industrys.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
            {errors?.industry && (
              <small className="text-red-600 font-bold text-sm">
                {errors.industry}
              </small>
            )}
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Company Size</label>
            <select
              name="companySize"
              className={`border border-black rounded-md w-full p-2 ${
                errors?.companySize && "border-red-600"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.companySize}
            >
              <option value="">Select Size</option>
              <option value="0-10">0-10</option>
              <option value="10-50">10-50</option>
              <option value="50-100">50-100</option>
              <option value="100 or above">100 or above</option>
            </select>
            {errors?.companySize && (
              <small className="text-red-600 font-bold text-sm">
                {errors.companySize}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full space-x-2">
        {isLoaded && (
          <div className="w-full">
            <label className="block text-gray-700">Headquarters</label>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleChange}
                placeholder="Search location"
                className={`border border-black rounded-md w-full p-2 ${
                  errors?.companyLocation && "border-red-600"
                }`}
              />
            </Autocomplete>
            {errors?.companyLocation && (
              <small className="text-red-600 font-bold text-sm">
                {errors.companyLocation}
              </small>
            )}
          </div>
        )}
        <div className="w-full">
          <InputField
            label="Primary Contact"
            name="PrimaryContact"
            value={formData.PrimaryContact}
            onChange={handleChange}
            error={errors?.PrimaryContact}
          />
        </div>
        <div className="w-full">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
      </div>

      <div className="flex w-full space-x-2">
        <div className="w-full">
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        {isLoaded && (
          <div className="w-full">
            <label className="block text-gray-700">Company Location</label>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                name="companyLocation"
                // value={formData.location}
                onChange={handleChange}
                placeholder="Search location"
                className={`border border-black rounded-md w-full p-2 `}
              />
            </Autocomplete>
          </div>
        )}
        {/* Company Size Select */}
        <div className="w-full">
          <label className="block text-gray-700">Company Size</label>
          <select
            name="size"
            className={`border border-black rounded-md w-full p-2 `}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            // value={formData.size}
          >
            <option value="">Select Size</option>
            <option value="0-10">0-10</option>
            <option value="10-50">10-50</option>
            <option value="50-100">50-100</option>
            <option value="100 or above">100 or above</option>
          </select>
        </div>
      </div>
      {/* Industry Select */}
      <div className="w-full">
        <label className="block text-gray-700">Industry</label>
        <select
          name="industry"
          className={`border border-black rounded-md w-full p-2 `}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.industry}
        >
          <option value="">Select Industry</option>
          {industrys.map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default CompanyProfile;