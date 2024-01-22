import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import { Comment } from "../../models/Comment";
import { Gif } from "../../models/Gif";
import { Like } from "../../models/Like";
import { Tag } from "../../models/Tag";
import { User } from "../../models/User";
import { RequestWithValidatedData } from "../../middlewares/validateWithRequestData";
import { GetGifsSchema } from "./GifSchema";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

export const uploadGif: RequestHandler = upload.single("gif");

const commonInclude = [
  { model: User, attributes: ["nickname", "id", "avatar", "email"] },
  {
    model: Tag,
    attributes: ["id", "name"],
    through: {
      as: "TagGifs",
      attributes: [],
    },
  },
  {
    model: Comment,
    attributes: ["id", "comment_text", "createdAt"],
    include: [{ model: User, attributes: ["id", "nickname", "avatar"] }],
  },
  {
    model: Like,
    attributes: ["id"],
    include: [
      { model: User, attributes: ["nickname", "id", "avatar", "email"] },
    ],
  },
];

export const getAllGifs: RequestHandler = async (
  req: RequestWithValidatedData<GetGifsSchema>,
  res,
  next,
) => {
  const { page = 1, pageSize = 10 } = req.validatedData;

  try {
    const { rows: gifs, count } = await Gif.findAndCountAll({
      include: [...commonInclude],
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return res.json({ data: gifs, count });
  } catch (err) {
    return next(err);
  }
};

export const getGifById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const currentGif = await Gif.findOne({
      where: { id },
      include: [...commonInclude],
    });

    if (!currentGif) {
      return res.json({ message: `Гифки с id ${id} не найдено` });
    }

    await currentGif.increment("viewers", { by: 1 });

    return res.json({ data: currentGif });
  } catch (err) {
    return next(err);
  }
};

export const createGif: RequestHandler = async (req, res) => {
  const { title, description, url, tags } = req.body;
  const { id } = req.user;
  try {
    const createdGif = await Gif.create({
      title,
      description,
      url,
      userId: id,
    });
    if (!createGif) {
      return res.json({ message: "Error creating the GIF" });
    }
    await createdGif.setTags(tags);
    return res.json({ data: createdGif });
  } catch (err) {
    return res.json({ message: err });
  }
};

export const deleteGifById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const gif = await Gif.findByPk(id);
    if (gif) {
      await gif.destroy();
      return res.json({
        message: `The item with id ${id} has been successfully deleted.`,
      });
    }
    return res.status(404).json({
      message: `Item with id ${id} not found.`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateGifById: RequestHandler = async (req, res, next) => {
  const { id, tags, title, description } = req.body;

  try {
    const gifToUpdate = await Gif.findByPk(id);
    if (!gifToUpdate) {
      return res.json({ id, message: "GIF not found." });
    }
    await gifToUpdate.update({ title, description });

    await gifToUpdate.setTags(tags);

    return res.json(gifToUpdate);
  } catch (err) {
    return next(err);
  }
};
