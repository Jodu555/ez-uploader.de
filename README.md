# ez-uploader.de
An Image/Text upload service which provides a bunch of extras and should integrate with ShareX


Database
======
![This is the basic DB modeling.](https://images.jodu555.de/a3136c46fc90223942413b42d3c8a609.png "This is the db model till now.")


## Basic Thoughts
### This Application is:	
-	Image Uploader
-	Text Uploader
-	Sharing all those uploaded works
-	Make them public/private or define who can see or edit the entry's

### This Application is not:
-	A Highly influenced file store like Dropbox
-	An Application that could handle more than 1k users
-	A General file store with files over 1gig

### Why I’d choose to build this Application:
This System is for me more a learning thing than a high industry standard app!\
I want to test e.g the hierarchical folder structure and how to represent them in code or implement them in the database \
I want to learn how to work with these types of sharing things\
I want to learn how generally a public application like this is structured also with where the files are stored\

### Idea behind the upload and entry thing
My Idea is that first an file gets uploaded and for this file in the background an entry got created
And if you want to maybe generate an text only then an entry will be created! I must write this out so  i get it myself

## Todo
*	[ ]  Entry: Image / Text: An Entry is just my naming representation for this system
*   [ ] Add an specific key for each user which allows to upload with shareX
*	[ ] Multiple Accounts System
*	[ ] Image-Uploader (SahreX Integration)
*	[ ] Text-Uploader (ShareX Integration)
*	[ ] An ability to create folders with hierarchical structures: To sort the entries
*	[ ] A Permission system to clarify if an Entry is password protected or just unlisted
*	[ ] An Global Permission system to allow an account to choose which user can see their pictures
*	[ ] Sorting System Day/Month/Year
*	[ ] Public page for any user to show their published entries
