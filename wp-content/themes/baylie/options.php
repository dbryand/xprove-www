<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 * 
 */

function optionsframework_option_name() {

	// This gets the theme name from the stylesheet (lowercase and without spaces)
	$theme = wp_get_theme();
	$themename = $theme->Name;
	$themename = preg_replace("/\W/", "", strtolower($themename) );
	
	$optionsframework_settings = get_option('optionsframework');
	$optionsframework_settings['id'] = $themename;
	update_option('optionsframework', $optionsframework_settings);
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the "id" fields, make sure to use all lowercase and no spaces.
 *  
 */

function optionsframework_options() {	
	
	// Home Project Type
	$home_project_type = array("all" => "All projects", "featured" => "Featured");	
	
	// Post Featured Image Size
	$post_featured_image_size = array("large" => "Large", "small" => "Small");
	
	// Slideshow Transition Effect
	$slideshow_effect = array("slide" => "Slide", "fade" => "Fade");
	
	// Pull all the pages into an array
	$options_pages = array();  
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
    	$options_pages[$page->ID] = $page->post_title;
	}
		
	// If using image radio buttons, define a directory path
	$imagepath =  get_bloginfo('stylesheet_directory') . '/images/';
		
	$options = array();
		
	$options[] = array( "name" => __('General','themetrust'),
						"type" => "heading");	
	
	$options[] = array( "name" => __('Logo','themetrust'),
						"desc" => __('Upload a custom logo.','themetrust'),
						"id" => "logo",
						"type" => "upload");
						
	$options[] = array( "name" => __('Favicon','themetrust'),
						"desc" => __('Upload a custom favicon.','themetrust'),
						"id" => "ttrust_favicon",
						"type" => "upload");					
		
	
	$options[] = array( "name" => __('Custom CSS','themetrust'),
						"desc" => __('Enter custom CSS here.','themetrust'),
						"id" => "ttrust_custom_css",
						"std" => "",
						"type" => "textarea");					
					
						
	$options[] = array( "name" => __('Appearance','themetrust'),
						"type" => "heading");
	
	$options[] = array( "name" => __('Header Color','themetrust'),
						"desc" => __('Select a header color for your theme.','themetrust'),
						"id" => "ttrust_color_header",
						"std" => "#74c9b4",
						"type" => "color");
						
	$options[] = array( "name" => __('Accent Color','themetrust'),
						"desc" => __('Select an accent color for your theme.','themetrust'),
						"id" => "ttrust_color_accent",
						"std" => "#85bec4",
						"type" => "color");
	
	$options[] = array( "name" => __('Menu Color','themetrust'),
						"desc" => __('Select a color for your menu links.','themetrust'),
						"id" => "ttrust_color_menu",
						"std" => "#8f8f8f",
						"type" => "color");
						
	$options[] = array( "name" => __('Menu Hover Color','themetrust'),
						"desc" => __('Select a hover color for your menu links.','themetrust'),
						"id" => "ttrust_color_menu_hover",
						"std" => "#2e2e2e",
						"type" => "color");
			
						
	$options[] = array( "name" => __('Button Color','themetrust'),
						"desc" => __('Select a color for your buttons.','themetrust'),
						"id" => "ttrust_color_btn",
						"std" => "#757575",
						"type" => "color");
						
	$options[] = array( "name" => __('Button Hover Color','themetrust'),
						"desc" => __('Select a hover color for your buttons.','themetrust'),
						"id" => "ttrust_color_btn_hover",
						"std" => "#595959",
						"type" => "color");
						
	$options[] = array( "name" => __('Link Color','themetrust'),
						"desc" => __('Select a color for your links.','themetrust'),
						"id" => "ttrust_color_link",
						"std" => "#4da7ca",
						"type" => "color");

	$options[] = array( "name" => __('Link Hover Color','themetrust'),
						"desc" => __('Select a hover color for your links.','themetrust'),
						"id" => "ttrust_color_link_hover",
						"std" => "#4290ae",
						"type" => "color");
						
	
						
	$options[] = array( "name" => __('Home Page','themetrust'),
						"type" => "heading");
						
	$options['ttrust_slideshow_enabled'] = array( "name" => __('Enable Slideshow','themetrust'),
						"desc" => __('Check this box to enable the home page slideshow.','themetrust'),
						"id" => "ttrust_slideshow_enabled",
						"std" => "1",
						"type" => "checkbox");

	$options[] = array( "name" => __('Home Message','themetrust'),
						"desc" => __('Enter a message you want to display on the home page below the slideshow.','themetrust'),
						"id" => "ttrust_home_message",
						"std" => "Baylie is an amazingly elegant theme.",
						"type" => "textarea");


	$options[] = array( "name" => __('Home Message Background','themetrust'),
						"desc" => __('Select a background color for the home message area.','themetrust'),
						"id" => "ttrust_color_home_message_bkg",
						"std" => "#252525",
						"type" => "color");

	$options[] = array( "name" => __('Home Message Background is Light','themetrust'),
						"desc" => __('Check this box if you choose a light background color for the home message area.','themetrust'),
						"id" => "ttrust_home_message_light_bkg",
						"std" => "",
						"type" => "checkbox");					
	
	$options[] = array( "name" => __('Number of Projects to Show','themetrust'),
						"desc" => __('Enter the number of project to show on the home page.','themetrust'),
						"id" => "ttrust_home_project_count",
						"std" => "6",
						"type" => "text");
						
	$options[] = array( "name" => __('Type of Projects to Show','themetrust'),
						"desc" => __('Select the type of projects to show on the home page.','themetrust'),
						"id" => "ttrust_home_project_type",
						"std" => "latest",
						"type" => "select",
						"options" => $home_project_type);	
	
	
	$options[] = array( "name" => __('Number of  Testimonials to Show','themetrust'),
						"desc" => __('Enter the number of Testimonials to show on the home page.','themetrust'),
						"id" => "ttrust_home_testimonial_count",
						"std" => "3",
						"type" => "text");						
	
						
	$options[] = array( "name" => __('Number of  Featured Pages to Show','themetrust'),
						"desc" => __('Enter the number of featured pages to show on the home page.','themetrust'),
						"id" => "ttrust_featured_pages_count",
						"std" => "6",
						"type" => "text");	
						
	$options[] = array( "name" => __('Enable Featured Pages Links','themetrust'),
						"desc" => __('Check this box to have the featured pages link to their corresponding single page when clicked.','themetrust'),
						"id" => "ttrust_featured_pages_links_enabled",
						"std" => "",
						"type" => "checkbox");		
	
	$options[] = array( "name" => __('Typography','themetrust'),
						"type" => "heading");					

	$options[] = array( "name" => __('Font for Home Slideshow Headings','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for home slideshow titles.','themetrust'),
						"id" => "ttrust_slideshow_heading_font",
						"std" => "",
						"type" => "text");
						
	$options[] = array( "name" => __('Font for Home Slideshow Text','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for home slideshow descriptions.','themetrust'),
						"id" => "ttrust_slideshow_body_font",
						"std" => "",
						"type" => "text");
						
	$options[] = array( "name" => __('Font for Home Message Text','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for home slideshow descriptions.','themetrust'),
						"id" => "ttrust_home_message_font",
						"std" => "",
						"type" => "text");

	$options[] = array( "name" => __('Font for Headings','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for headings.','themetrust'),
						"id" => "ttrust_heading_font",
						"std" => "",
						"type" => "text");
						
	$options[] = array( "name" => __('Font for Sub Headings','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for sub headings.','themetrust'),
						"id" => "ttrust_sub_heading_font",
						"std" => "",
						"type" => "text");

	$options[] = array( "name" => __('Font for Body Text','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for the body text.','themetrust'),
						"id" => "ttrust_body_font",
						"std" => "",
						"type" => "text");

	$options[] = array( "name" => __('Font for Main Menu','themetrust'),
						"desc" => __('Enter the name of the <a href="http://www.google.com/webfonts" target="_blank">Google Web Font</a> you want to use for the main menu.','themetrust'),
						"id" => "ttrust_menu_font",
						"std" => "",
						"type" => "text");					
						
	$options[] = array( "name" => __('Slideshow','themetrust'),
						"type" => "heading");	

	$options[] = array( "name" => __('Slideshow Delay','themetrust'),
						"desc" => __('Enter the delay in seconds between slides. Enter 0 to disable auto-playing.','themetrust'),
						"id" => "ttrust_slideshow_delay",
						"std" => "6",
						"type" => "text");

	$options[] = array( "name" => __('Slideshow Effect','themetrust'),
						"desc" => __('Select the type of transition effect for slideshows created with the slideshow shortcode.','themetrust'),
						"id" => "ttrust_slideshow_effect",
						"std" => "fade",
						"type" => "select",
						"options" => $slideshow_effect);	

						
	$options[] = array( "name" => __('Posts','themetrust'),
						"type" => "heading");
						
	$options[] = array( "name" => __('Show Author','themetrust'),
						"desc" => __('Check this box to show the author.','themetrust'),
						"id" => "ttrust_post_show_author",
						"std" => "1",
						"type" => "checkbox");
						
	$options[] = array( "name" => __('Show Date','themetrust'),
						"desc" => __('Check this box to show the publish date.','themetrust'),
						"id" => "ttrust_post_show_date",
						"std" => "1",
						"type" => "checkbox");
						
	$options[] = array( "name" => __('Show Category','themetrust'),
						"desc" => __('Check this box to show the category.','themetrust'),
						"id" => "ttrust_post_show_category",
						"std" => "1",
						"type" => "checkbox");
						
	$options[] = array( "name" => __('Show Comment Count','themetrust'),
						"desc" => __('Check this box to show the comment count.','themetrust'),
						"id" => "ttrust_post_show_comments",
						"std" => "1",
						"type" => "checkbox");
						
	$options[] = array( "name" => __('Featured Image Size','themetrust'),
						"desc" => __('Select the size of the post featured image.','themetrust'),
						"id" => "ttrust_post_featured_img_size",
						"std" => "large",
						"type" => "select",
						"options" => $post_featured_image_size);
						
	$options[] = array( "name" => __('Show Featured Image on Single Posts','themetrust'),
						"desc" => __('Check this box to show the featured image on single post pages.','themetrust'),
						"id" => "ttrust_post_show_featured_image",
						"std" => "0",
						"type" => "checkbox");	
						
	$options[] = array( "name" => __('Enable Full Width Blog','themetrust'),
						"desc" => __('Check this box to make your posts span the width of the page.','themetrust'),
						"id" => "ttrust_post_full_width",
						"std" => "0",
						"type" => "checkbox");
						
	$options[] = array( "name" => __('Show Full Posts','themetrust'),
						"desc" => __('Check this box to show full posts instead of excerpts on index and archive pages.','themetrust'),
						"id" => "ttrust_post_show_full",
						"std" => "0",
						"type" => "checkbox");
						
	$options[] = array( "name" => "Select a Page",
						"desc" => "Select the page you're using as your blog page. This is used to show the blog title at the top of your posts.",
						"id" => "ttrust_blog_page",
						"type" => "select",
						"options" => $options_pages);
						
	$options[] = array( "name" => __('Footer','themetrust'),
						"type" => "heading");	
	
	$options[] = array( "name" => __('Left Footer Text','themetrust'),
						"desc" => __('This will appear on the left side of the footer.','themetrust'),
						"id" => "ttrust_footer_left",
						"std" => "",
						"type" => "textarea");

	$options[] = array( "name" => __('Right Footer Text','themetrust'),
						"desc" => __('This will appear on the right side of the footer.','themetrust'),
						"id" => "ttrust_footer_right",
						"std" => "",
						"type" => "textarea");
						
	$options[] = array( "name" => __('Integration','themetrust'),
						"type" => "heading");	
						
	$options[] = array( "name" => __('Analytics','themetrust'),
						"desc" => __('Enter your custom analytics code. (e.g. Google Analytics).','themetrust'),
						"id" => "ttrust_analytics",
						"std" => "",
						"type" => "textarea",
						"validate" => "none");
						
	
	
						
	
	return $options;
}