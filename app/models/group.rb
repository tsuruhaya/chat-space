class Group < ApplicationRecord
  has_many :memders
  has_many :users, through: :memders
  has_many :messages
  validates :name, presence: true, uniqueness: true
end
