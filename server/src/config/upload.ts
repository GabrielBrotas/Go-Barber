import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

export default {
  storage: multer.diskStorage({
    // local onde as imagens vao ser salvas
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")
      const  fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
