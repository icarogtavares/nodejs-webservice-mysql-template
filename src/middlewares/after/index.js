import express from 'express';

import badRequest from './bad-request';
import notFound from './not-found';

const router = express.Router();

router.use(badRequest);
router.use(notFound);

export default router;