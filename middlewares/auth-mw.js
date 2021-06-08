const { alert } = require('../modules/utils');

const isGuest = (req, res, next) => {
	if(!req.session.user) next();
	else res.send(alert('로그인 상태에서 접근 불가능합니다.', '/'));
}

const isDormant = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 1) next();
	else res.send(alert('유휴회원만 접근 가능합니다.', '/'));
}

const isUser = (req, res, next) => {
	if(req.session.user) next();
	else res.send(alert('로그인 후 사용 가능합니다.', '/'));
}

const isVip = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 3) next();
	else res.send(alert('VIP회원만 접근 가능합니다.', '/'));
}

const isAdmin = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 9) next();
	else res.send(alert('관리자만 접근 가능합니다.', '/'));
}

module.exports = { isGuest, isDormant, isUser, isVip, isAdmin };