Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate: 'notFound'
})

Router.route('/',function(){
	this.render('products')
})

Router.route('/posts',function(){
	this.render('posts')
})

Router.route('/about',function(){
	this.render('about')
})

Router.route('/upload/:filename',function () {
  this.response.end('hi from the server\n'+ this.params.filename);
}, {where: 'server'});
