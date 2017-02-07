require('babel-polyfill')
import page from 'page'
import moment from 'moment'

require('moment/locale/es')

moment.locale('es');

require('./home')

page()
