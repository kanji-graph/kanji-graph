class SurnamesController < ApplicationController
  before_action :set_surname, only: [:show, :edit, :update, :destroy]

  def histogram
    @histogram_data = Surname.histogram_data
    render json: @histogram_data
  end

  # GET /surnames
  # GET /surnames.json
  def index
    @surnames = Surname.all
  end

  # GET /surnames/1
  # GET /surnames/1.json
  def show
  end

  # GET /surnames/new
  def new
    @surname = Surname.new
  end

  # GET /surnames/1/edit
  def edit
  end

  # POST /surnames
  # POST /surnames.json
  def create
    @surname = Surname.new(surname_params)

    respond_to do |format|
      if @surname.save
        format.html { redirect_to @surname, notice: 'Surname was successfully created.' }
        format.json { render action: 'show', status: :created, location: @surname }
      else
        format.html { render action: 'new' }
        format.json { render json: @surname.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /surnames/1
  # PATCH/PUT /surnames/1.json
  def update
    respond_to do |format|
      if @surname.update(surname_params)
        format.html { redirect_to @surname, notice: 'Surname was successfully updated.' }
        format.json { render action: 'show', status: :ok, location: @surname }
      else
        format.html { render action: 'edit' }
        format.json { render json: @surname.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surnames/1
  # DELETE /surnames/1.json
  def destroy
    @surname.destroy
    respond_to do |format|
      format.html { redirect_to surnames_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_surname
      @surname = Surname.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def surname_params
      params.require(:surname).permit(:name)
    end
end
