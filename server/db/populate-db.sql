-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO users (username,email,password,profile_pic) values ('admin','admin@cyf.org', 'admin_password','https://image.flaticon.com/icons/png/512/145/145987.png');
INSERT INTO users (username,email,password,profile_pic) values ('user','user@cyf.org', 'user_password','https://image.flaticon.com/icons/png/512/145/145987.png');
insert into users (username,email,password,profile_pic) values('reyam','reyam@gmail.com','123455','https://image.flaticon.com/icons/png/512/145/145987.png');
insert into users (username,email,password,profile_pic) values('ahmed','ahmed@gmail.com','73635','https://www.shareicon.net/download/2016/09/01/822711_user_512x512.png');
insert into users (username,email,password,profile_pic) values('zan','zan@gmail.com','2516722', 'https://image.flaticon.com/icons/png/512/145/145987.png');

INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('My friend is at risk of eviction, anyone aware of any organisations that can help her in regard to the Serco evictions?','2019-04-11',ARRAY['immigrantion'],false,4,5);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('When interviewing arrivals seeking entry, what questions do UK Immigration offices ask?','2019-03-12',ARRAY['immigrantion'],false,2,4);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Does anyone know where I can find a good halal shop? I live in the south side but can travel.  ','2019-04-13',ARRAY['halal','food'],false,0,3);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Is there a Romanian Orthodox Church in Glasgow?','2019-04-14',ARRAY['visa'],false,0,1);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Stie cineva de unde pot lua branza proaspata de vaci? ','2019-04-15',ARRAY['romanian'],false,4,2);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('My kids have seen a photo of an amusement/waterpark and are pestering me to take them there, is there one close to Glasgow? ','2019-04-16',ARRAY['family'],false,0,4);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Stie cineva unde pot gasi zacusca?','2019-04-17',ARRAY['food'],false,0,2);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Where can I exchange Egyptian pounds to sterling?','2019-04-18',ARRAY['currency'],false,0,3);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('¿Alguien sabe qué es Council Tax y por qué hay que pagarlo?','2019-04-19',ARRAY['council-tax'],false,0,5);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Feeling homesick for my favourite food! Any good East African restaurants in Glasgow?','2019-04-20',ARRAY['food'],false,0,4);
INSERT INTO questions (content,date_posted,tags,is_answered,score,user_id) values('Can I bring my spouse to my GP appointment?','2019-04-20',ARRAY['doctor'],false,0,1);

INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('De la vaca :)','2019-09-10','',false,0,5,1);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('There is no prescribed set of questions; the IO will be trying to determine if you qualify as a visitor under Appendix V of the rules. So a full interview will cover purpose, length, maintenance, accommodation, returnability, and overstay risk.','2015-09-21','',true,2,2,2);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('The Romanian Orthodox Church in Glasgow meets in the halls of Shettleston Old Parish Church. ','2019-09-27','',false,0,4,2);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('E un magazin Est-European in Govanhill, nu tin minte exact strada, dar stiu ca e undeva langa Queen's park.','2019-09-12','',false,0,7,1);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('El Council Tax es un impuesto que cada vivienda del Reino Unido debe pagar, y es el equivalente a la comunidad que pagamos en España. Se trata de un pago mensual que realizamos al gobierno para pagar los servicios públicos del distrito, como por ejemplo la recogida de basuras, el mantenimiento de calles y jardines, las bibliotecas…','2019-09-08','',false,0,9,2);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('Calabash on Union Street next to Glasgow central station... takes me back home every time I visit','2019-09-21','',false,0,10,5);
INSERT INTO answers (content,date_answered,tags,is_accepted,score,question_id,user_id) values('yes, if you'd feel more confident if someone else is with you','2019-09-21','',false,0,11,3);
