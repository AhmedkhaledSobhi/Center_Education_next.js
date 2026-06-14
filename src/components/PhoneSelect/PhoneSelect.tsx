
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import phoneCodeData from "@/localesJson/PhoneCode.json";

type PhoneCodeItem = {
  id?: number;
  countryName?: string;
  code: string;
};

type Props = {
  // selectedCountry: string;
  // setSelectedCountry: (code: string) => void;
  selectedCountry: PhoneCodeItem;
  setSelectedCountry: (country: PhoneCodeItem) => void;
};

export default function PhoneSelect({
  selectedCountry,
  setSelectedCountry,
}: Props) {
  const phoneCode: PhoneCodeItem[] = phoneCodeData?.phoneCodes || [];
  console.log(
    phoneCode.filter(
      (item, index, arr) =>
        arr.findIndex((x) => x.code === item.code) !== index
    )
  );
  return (
    <Select.Root
      value={`${selectedCountry.id}-${selectedCountry.code}`}
      onValueChange={(value) => {
        const item = phoneCode.find(
          (x) => `${x.id}-${x.code}` === value
        );

        if (item) {
          setSelectedCountry(item);
        }
      }}
    >
      {/* Trigger */}
      <Select.Trigger
        className="
          flex items-center justify-between px-2
          shadow- sm
        "
      >
        <Select.Value placeholder="Select code" />
        {/* <Select.Icon> */}
          {/* <ChevronDown size={18} className="text-gray-500" /> */}
        {/* </Select.Icon> */}
      </Select.Trigger>

      {/* Dropdown */}
      <Select.Portal>
        <Select.Content
          position="popper"
          className="
            top
            z-50 bg-white border rounded-2xl shadow-xl
            overflow-hidden w-55
          "
        >
          <Select.Viewport className="p-2 max-h-60 overflow-auto">
            {phoneCode.map((item) => (
              <Select.Item
                // key={item.code}
                // value={item.code}
                key={`${item.id}-${item.code}`}
                value={`${item.id}-${item.code}`}
                className="
                  flex items-center justify-between px-3 py-2
                  rounded-lg cursor-pointer
                  outline-none
                  hover:bg-gray-100
                  focus:bg-gray-100
                  transition
                "
              >
                {/* Left side */}
                <Select.ItemText>
                  <span className="text-sm font-medium">
                    {item.countryName ? `${item.countryName} (${item.code})` : item.code}
                  </span>
                </Select.ItemText>

                {/* Selected indicator */}
                <Select.ItemIndicator>
                  <Check size={16} className="text-green-500" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}