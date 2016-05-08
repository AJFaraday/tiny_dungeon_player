QUnit.module('TDP.console');

QUnit.test(
  'should build the major message',
  function (assert) {
    var major = TDP.console.render_major('big');
    assert.ok(
      major.hasClass('TDP_readout_major'),
      'should be a div of class TDP_readout_major'
    );
    assert.equal(
      major.html(),
      'big',
      'should contain the message it was given'
    );
  }
);

QUnit.test(
  'should build the minor message',
  function (assert) {
    var minor = TDP.console.render_minor('small');
    assert.ok(
      minor.hasClass('TDP_readout_minor'),
      'should be a div of class TDP_readout_minor'
    );
    assert.equal(
      minor.html(),
      'small',
      'should contain the message it was given'
    );
  }
);

QUnit.test(
  'should build the full message',
  function (assert) {
    var major = TDP.console.render_major('big');
    var minor = TDP.console.render_minor('small');
    var full = TDP.console.render_message(major, minor);
    assert.ok(
      full.hasClass('TDP_readout_message'),
      'should have a class of TDP_readout_message'
    );

    assert.equal(
      full.find('br').length,
      2,
      'should have a line break'
    );

    assert.equal(
      full.find('span.TDP_readout_major').html(),
      'big',
      'should contain the major message'
    );

    assert.equal(
      full.find('span.TDP_readout_minor').html(),
      'small',
      'should contain the major message'
    );
  }
);

QUnit.test(
  'should add the message to the readout',
  function (assert) {
    TDP.console.log('big', 'small');
    assert.equal(
      $('#TDP_readout .TDP_readout_message span.TDP_readout_major').html(),
      'big',
      'should have added the major message'
    );
    assert.equal(
      $('#TDP_readout .TDP_readout_message span.TDP_readout_minor').html(),
      'small',
      'should have added the minor message'
    );
  }
);

QUnit.test(
  'should not have more than 5 messages in the log',
  function (assert) {
    TDP.console.log('big1', 'small');
    TDP.console.log('big2', 'small');
    TDP.console.log('big3', 'small');
    TDP.console.log('big4', 'small');
    TDP.console.log('big5', 'small');
    TDP.console.log('big6', 'small');
    TDP.console.log('big7', 'small');

    assert.notOk(
      (TDP.UI.readout.html().indexOf('big1') >= 0),
      "It shouldn't still be showing the first message"
    );

      assert.ok(
        (TDP.UI.readout.html().indexOf('big2') >= 0),
        "It should still be showing the second message"
      );
  }
);
