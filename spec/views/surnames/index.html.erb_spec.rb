require 'spec_helper'

describe "surnames/index" do
  before(:each) do
    assign(:surnames, [
      stub_model(Surname,
        :name => "Name"
      ),
      stub_model(Surname,
        :name => "Name"
      )
    ])
  end

  it "renders a list of surnames" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
