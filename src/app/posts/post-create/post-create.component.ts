import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { PostsService } from '../posts.service';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	/*this is the file angular will look for, 
	the template and then parse.
	*/
	//We can only have 1 template but we can have multiple styles
	styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
	enteredTitle = "";
	enteredContent = "";
	// newPost = 'No content by default'; // not a keyword, just a name

	/*following onAddPost is an event linked 
	in the post-create.component.html file
	*/

	constructor(public postsService: PostsService){}

	onAddPost(form: NgForm){
		if(form.invalid){
			return;
		}
		this.postsService.addPost(form.value.title, form.value.content);
		form.resetForm();
	}
}
