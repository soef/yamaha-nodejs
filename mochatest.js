var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var Yamaha = require("./yamaha.js");



var yamaha_ip= process.argv[4] || "192.168.0.25";

// Tests For Yamaha RV-775
describe('Yamaha-API', function() {
    this.timeout(5000);

    it('should create a yamaha object', function() {
        var yamaha = new Yamaha(yamaha_ip);
    });

    it('should be turned on', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.powerOn().then(function(){
            return yamaha.isOn();
        })).to.eventually.be.true;
            
    });

    it('should be double turned on', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.powerOn().then(function(){
            return yamaha.isOn();
        })).to.eventually.be.true;
    });


    it('should return 16 Inputs', function() {
        var yamaha = new Yamaha(yamaha_ip);
        return expect(yamaha.getAvailableInputs()).to.eventually.have.length(16);
    });

    it('should set volume to -600', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.setVolume(-600).then(function(on){
            return yamaha.getVolume();
        })).to.eventually.equal(-600);
    });

    it('should increase volume by 100', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.volumeUp(100).then(function(on){
            return yamaha.getVolume();
        })).to.eventually.equal(-500);;
    });


    // it('should switch to the webradio favorites using the chained command', function() {
    //  var yamaha = new Yamaha(yamaha_ip, 0.5);

    //  yamaha.switchToFavoriteNumber(1).then(function(result){
    //      yamaha.getCurrentInput().then(function(result){
    //          expect(result).to.equal("NET RADIO");
    //      });
    //  }.to.eventually.be.false);

    // });


    it('should switch to HDMI2', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.setMainInputTo("HDMI2").then(function() {
            return yamaha.getCurrentInput();
        })).to.eventually.equal("HDMI2");

    });

    it('should switch to NET RADIO', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.setMainInputTo("NET RADIO").then(function() {
            return yamaha.getCurrentInput();
        })).to.eventually.equal("NET RADIO");

    });

    it('should switch to the webradio favorites and wait to be ready', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);

        return expect(yamaha.whenMenuReady("NET_RADIO").then(function(result){
            return yamaha.selectWebRadioListItem(1).then(function(inputs){
                return yamaha.whenMenuReady("NET_RADIO");
            });
        })).to.eventually.be.true;

    });

    it('should switch to partey mode on', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.partyModeOn().then(function(on){
            return yamaha.isPartyModeEnabled();
        })).to.eventually.be.true;
    });

     it('should switch to partey mode off', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.partyModeOff().then(function(on){
            return yamaha.isPartyModeEnabled();
        })).to.eventually.be.false;
    });

    it('should mute main_zone', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.muteOn().then(function(on){
            return yamaha.isMuted();
        })).to.eventually.be.true;
    });

    it('should unmute main_zone', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.muteOff().then(function(on){
            return yamaha.isMuted();
        })).to.eventually.be.false;
    });


    it('should turn on zone 2', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.powerOn(2).then(function(){
            return yamaha.isOn(2);
        })).to.eventually.be.true;
            
    });

    it('should mute zone 2', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.muteOn(2).then(function(on){
            return yamaha.isMuted(2);
        })).to.eventually.be.true;
    });

    it('should still have main zone unmuted', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.isMuted()).to.eventually.be.false;
    });

    it('should unmute zone 2', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.muteOff(2).then(function(on){
            return yamaha.isMuted(2);
        })).to.eventually.be.false;
    });

    it('should be turn off zone 2', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.powerOff(2).then(function(on){
            return yamaha.isOn(2);
        })).to.eventually.be.false;
    });

    it('should be turned off', function() {
        var yamaha = new Yamaha(yamaha_ip, 0.5);
        return expect(yamaha.powerOff().then(function(on){
            return yamaha.isOn();
        })).to.eventually.be.false;
    });


    // it('should list the webradio favorites list info', function() {
    //  var yamaha = new Yamaha(yamaha_ip, 0.5);

    //  return yamaha.whenMenuReady("NET_RADIO").then(function(result){
    //      return yamaha.selectWebRadioListItem(1).then(function(inputs){
    //          return yamaha.whenMenuReady("NET_RADIO").then(function(result){
    //              expect(result).to.be.true;
    //          });
    //      }.to.eventually.be.false);

    //  });

    // });

    

    


});