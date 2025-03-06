import { z } from "zod";

const BotActionClassSchema = z.enum(["default", "captcha", "debug"]);

const BotActionCaptchaTypeSchema = z.enum(["wait", "solve", "disableAutoSolve"]);

const BotActionDebugTypeSchema = z.enum(["screenshot", "url"]);

const BotActionTypeSchema = z.union([
  z.literal("form"),
  z.literal("click"),
  z.literal("delay"),
  z.literal("goto"),
  z.literal("input"),
  z.literal("download"),
  BotActionCaptchaTypeSchema,
  BotActionDebugTypeSchema,
]);

export const BotActionSchema = z.object({
  type: BotActionTypeSchema,
  class: BotActionClassSchema,
  selector: z.string().optional(),
  value: z.string().optional(),
  timeout: z.number().optional(),
  validationURL: z.string().optional(),
});

export const BotActionListObjectSchema = z.object({
    actions: z.array(BotActionSchema),
});