//Audiodevice by http://whoshacks.blogspot.com/2009/01/change-audio-devices-via-shell-script.html

//Settings
const port = '7531';
const caption = 'Soundcast';

//Shell and filesystem dependencies
require('shelljs/global');
var path = require('path');

//Electron dependencies
var menubar = require('menubar');
var Menu = require('menu');
var MenuItem = require('menu-item');
var dialog = require('dialog');
var mb = menubar({dir: __dirname, icon: 'not-castingTemplate.png'});
//Pointer to the chromecast-osx-audio process
var chromecast;
//Indicates if the user reset the OSX selected sound adapters
var adapter_reset = false;

//Stores sound input device in use before starting soundcast
var original_input;
getDevice('input', function(data){
  original_input = data;
});
//Stores sound output device in use before starting soundcast
var original_output;
getDevice('output', function(data){
  original_output = data;
});

//Gets OSX currently selected sound device
function getDevice(which, callback){
  exec(path.join(__dirname,'/audiodevice '+which), {async:true}).stdout.on('data', function(data) {
    callback(data.replace(/(\r\n|\n|\r)/gm,""));
  });
}
//Sets OSX selected sound device
function setDevice(which, what){
  exec(path.join(__dirname,'/audiodevice '+which+' "'+what+'"'), {async:true});
}

//Menubar construction
mb.on('ready', function ready () {
  menu = new Menu();
  //Changes tray icon to "Not casting" (this is redundant but, for some reason,
  //the packaged app doesn't apply the constructor given icon parameter
  mb.tray.setImage(path.join(__dirname,'not-castingTemplate.png'));
  //Clicking this option starts casting audio to Chromecast
  menu.append(new MenuItem({
		label: 'Start casting',
    click: function(){
      //Enables "Stop casting" and disables "Start casting" options
      menu.items[0].enabled = false;
      menu.items[1].enabled = true;
      //Changes tray icon to "Casting"
      mb.tray.setImage(path.join(__dirname,'castingTemplate.png'));
      //Sets OSX selected input and output audio devices to Soundflower
      setDevice('output','Soundflower (2ch)');
      setDevice('input','Soundflower (2ch)');
      //Spawns new subprocess that bridges system audio to the first chromecast found
      //We use a custom node binary because the chromecast-osx-audio module only works
      //on node v0.10
      chromecast = exec(path.join(__dirname,'/node ',__dirname,'/node_modules/chromecast-osx-audio/bin/chromecast.js -n '+caption+' -p '+port), function (err, stdout, stderr){
        if (err) {
            console.log("child processes failed with error code: "+err.code);
        }
        console.log(stdout);
      });
    }
  }));

  //Clicking this option stops casting audio to Chromecast
  menu.append(new MenuItem({
    label: 'Stop casting',
    click: function(){
      //Enables "Start casting" and disables "Stop casting" options
      menu.items[0].enabled = true;
      menu.items[1].enabled = false;
      //Changes tray icon to "Not casting"
      mb.tray.setImage(path.join(__dirname,'not-castingTemplate.png'));
      //Changes OSX selected audio devices back to their original selections
      setDevice('output',original_output);
      setDevice('input',original_input);
      //Kills chromecast subprocess
      chromecast.kill();
    }
  }));

	menu.append(new MenuItem({type: 'separator'}));

  /*Clicking this option resets OSX selected audio devices to internal
    this is necessary when something goes wrong and OSX selected audio devices
    are not changed back to original values and stay stuck in Soundflower*/
  menu.append(new MenuItem({
    label: 'Reset audio adapter',
    click: function(){
      /*Remember this option was clicked, so it isn' changed back to Soundflower
        when quiting*/
      adapter_reset = true;
      //Enables "Start casting" and disables "Stop casting" options
      menu.items[0].enabled = true;
      menu.items[1].enabled = false;
      //Sets tray icon to "Not casting"
      mb.tray.setImage(path.join(__dirname,'not-castingTemplate.png'));
      //Sets OSX selected audio devices to internal
      setDevice('output','internal');
      setDevice('input','internal');
      //Kill chromecast subprocess if it exists
      if(chromecast){
          chromecast.kill();
      }
    }
  }));

  //Clicking this option shows an 'About' dialog
  menu.append(new MenuItem({
    label: 'About',
    click: function(){
      dialog.showMessageBox({
        title: 'About',
        message: 'SoundCast v1.2. Created by Andres Gottlieb.',
        detail: 'https://www.github.com/andresgottlieb/soundcast',
        buttons: ["OK"] });
    }
  }));

  //Clicking this option quits the soundcast app
  menu.append(new MenuItem({
			label: 'Quit',
      click: function(){
        //Only change back to original values if adapters where not reset
        if(!adapter_reset){
          setDevice('output',original_output);
          setDevice('input',original_input);
        }
        //Kill chromecast subprocess if it exists
        if(chromecast){
            chromecast.kill();
        }
        //Quit the app
        mb.app.quit();
      }
		}));

  //Start with "Stop casting" option disabled
  menu.items[1].enabled = false;
  //Enable the tray
  mb.tray.setContextMenu(menu);
});
