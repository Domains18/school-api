const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

const server = express();

