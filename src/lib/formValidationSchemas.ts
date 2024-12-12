import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is a required field",
      invalid_type_error: "Username must be a string",
    })
    .min(1, {
      message: "Username is required",
    }),
  password: z
    .string({
      required_error: "Password is a required field",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const deleteSchema = z.object({
  id: z.coerce.string().optional(),
  table: z.enum(["vendor", "user", "staff", "cashDrawer", "assets", 'order'], {
    message: "table is required!",
  }),
});

export type DeleteSchema = z.infer<typeof deleteSchema>;

export const vendorSchema = z.object({
  id: z.coerce.number().optional(),
  vendorName: z.string().min(1, { message: "Vendor name is required!" }),
  vendorCode: z
    .string()
    .min(2, { message: "Vendor code must be at least 2 characters long!" })
    .max(10, { message: "Vendor code must be at most 20 characters long!" }),
  vendorAddress: z.coerce.string().optional(),
  city: z.coerce.string().optional(),
  district: z.coerce.string().optional(),
  ward: z.coerce.string().optional(),
  homeNumber: z.coerce.string().optional(),
});

export type VendorSchema = z.infer<typeof vendorSchema>;

export const goldPriceSchema = z.object({
  goldType: z.coerce.string().optional(),
  askPrice: z.coerce.number().min(1000, { message: "Ask price is required!" }),
  bidPrice: z.coerce.number().min(1000, { message: "Bid price is required!" }),
});

export type GoldPriceSchema = z.infer<typeof goldPriceSchema>;

export const contactSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Name is required!" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long!" })
    .max(20, { message: "Phone number must be at most 20 characters long!" }),
  phoneType: z.enum(["home", "mobile"], { message: "Phone type is required!" }),
  description: z.coerce.string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const staffSchema = z.object({
  id: z.coerce.number().optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long!" })
    .max(20, { message: "Phone number must be at most 20 characters long!" }),
  address: z.coerce.string().optional(),
  city: z.coerce.string().optional(),
  district: z.coerce.string().optional(),
  ward: z.coerce.string().optional(),
  homeNumber: z.coerce.string().optional(),
});

export type StaffSchema = z.infer<typeof staffSchema>;

export const userSchema = z.object({
  id: z.coerce.number().optional(),
  role: z.enum(["user", "sales", "manager"], {
    message: "Role is required!",
  }),
  email: z.string().min(1, { message: "Last name is required!" }),
  username: z.string().min(1, { message: "First name is required!" }),
  staffId: z.coerce.number().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  productName: z.string().min(1, { message: "Product name is required!" }),
  goldType: z.string().min(1, { message: "Gold type is required!" }),
  vendorId: z.string().min(1, { message: "Vendor is required!" }),
  category: z.enum(["ring", "necklace", "bracelet", "other"], {
    message: "Category is required!",
  }),
  totalWeight: z.string().refine(
    (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && /^\d+\.\d{3}$/.test(value);
    },
    {
      message:
        "Input must be a valid number with exactly three decimal places (e.g., 123.000).",
    },
  ),
  goldWeight: z.string().refine(
    (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && /^\d+\.\d{3}$/.test(value);
    },
    {
      message:
        "Input must be a valid number with exactly three decimal places (e.g., 123.000).",
    },
  ),
  gemWeight: z.string().refine(
    (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && /^\d+\.\d{3}$/.test(value);
    },
    {
      message:
        "Input must be a valid number with exactly three decimal places (e.g., 123.000).",
    },
  ),
  wage: z.coerce.number().min(100, { message: "Wage is required!" }),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const cashDrawerSchema = z.object({
  drawerName: z.string({
    required_error: 'Drawer name is a required field',
  }),
  drawerType: z.string({
    required_error: 'Drawer name is a required field',
  }),
});

export type CashDrawerSchema = z.infer<typeof cashDrawerSchema>;

export const assetSchema = z.object({
  assetType: z.string({
    required_error: 'Drawer name is a required field',
  }),
  amount: z.coerce.number().min(100, { message: "Amount is required!" }),
});

export type AssetSchema = z.infer<typeof assetSchema>;
