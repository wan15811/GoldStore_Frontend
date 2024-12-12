import { processAddress } from "@/utils/processAddress";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { FormModalProps } from "./@types/FormModalProps";

const DeleteForm = dynamic(() => import("../forms/DeleteForm"), {
  loading: () => <h1>Loading...</h1>,
});
const VendorForm = dynamic(() => import("../forms/VendorForm"), {
  loading: () => <h1>Loading...</h1>,
});
const GoldPriceForm = dynamic(() => import("../forms/GoldPriceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ContactForm = dynamic(() => import("../forms/ContactForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StaffForm = dynamic(() => import("../forms/StaffForm"), {
  loading: () => <h1>Loading...</h1>,
});
const UserForm = dynamic(() => import("../forms/UserForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ProductForm = dynamic(() => import("../forms/ProductForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CashDrawerForm = dynamic(() => import("../forms/CashDrawerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssetForm = dynamic(() => import("../forms/AssetForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    props: FormModalProps,
  ) => JSX.Element;
} = {
  delete: (
    setOpen,
    { setIsRefresh, setShowMessage, setMessageType, setMessage, data },
  ) => {
    return (
      <DeleteForm
        type="delete"
        setOpen={setOpen}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessageType={setMessageType}
        setMessage={setMessage}
        data={data}
      />
    );
  },
  vendor: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage, data },
  ) => {
    if (type === "create") {
      return (
        <VendorForm
          type={type}
          setOpen={setOpen}
          setMessageType={setMessageType}
          setIsRefresh={setIsRefresh}
          setShowMessage={setShowMessage}
          setMessage={setMessage}
        />
      );
    }

    const [homeNumber, wardId, districtId, cityId] = processAddress(
      data.vendorAddress,
    );
    const processedData = {
      ...data,
      city: cityId,
      district: districtId,
      ward: wardId,
      homeNumber: homeNumber,
    };

    return (
      <VendorForm
        type={type}
        data={processedData}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
    );
  },
  goldPrice: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage, data },
  ) => {
    return (
      <GoldPriceForm
        type={type}
        data={data}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
    );
  },
  contact: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage, data },
  ) => {
    return (
      <ContactForm
        type={type}
        data={data}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
    );
  },
  staff: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage, data },
  ) => {
    if (type === "create") {
      return (
        <StaffForm
          type={type}
          setOpen={setOpen}
          setMessageType={setMessageType}
          setIsRefresh={setIsRefresh}
          setShowMessage={setShowMessage}
          setMessage={setMessage}
        />
      );
    }

    const [homeNumber, wardId, districtId, cityId] = processAddress(
      data.address,
    );
    const processedData = {
      ...data,
      city: cityId,
      district: districtId,
      ward: wardId,
      homeNumber: homeNumber,
    };

    return (
      <StaffForm
        type={type}
        data={processedData}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
    );
  },
  user: (
    setOpen,
    {
      type,
      setIsRefresh,
      setShowMessage,
      setMessageType,
      setMessage,
      data,
      relatedData,
    },
  ) => {
    return (
      <UserForm
        type={type}
        data={data}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
        relatedData={relatedData}
      />
    );
  },
  product: (
    setOpen,
    {
      type,
      setIsRefresh,
      setShowMessage,
      setMessageType,
      setMessage,
      data,
      relatedData,
    },
  ) => {
    return (
      <ProductForm
        type={type}
        data={data}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
        relatedData={relatedData}
      />
    );
  },
  cashDrawer: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage },
  ) => {
    return (
      <CashDrawerForm
        type={type}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
    );
  },
  assets: (
    setOpen,
    { type, setIsRefresh, setShowMessage, setMessageType, setMessage, relatedData },
  ) => {
    return (
      <AssetForm
        type={type}
        setOpen={setOpen}
        setMessageType={setMessageType}
        setIsRefresh={setIsRefresh}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
        relatedData={relatedData}
      />
    );
  },
};

export { forms };
