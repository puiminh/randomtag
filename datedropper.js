new dateDropper({
  selector: 'input[type="date"]',
  onChange: function (res) {
    console.log('You have selected ' + (res.output.mm + '/' + res.output.dd + '/' + res.output.y));
  }
});

