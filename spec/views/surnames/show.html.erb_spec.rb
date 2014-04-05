require 'spec_helper'

describe "surnames/show" do
  before(:each) do
    @surname = assign(:surname, stub_model(Surname,
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
  end
end
